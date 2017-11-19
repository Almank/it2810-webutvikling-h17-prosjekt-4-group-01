const express = require('express');
const router = express.Router();
const server = require('./server');
const db = server.db;
const model = require('./models');

const userModel = model.User;
const jwt = require('jsonwebtoken');
const config = {'secret': 'supersecretkey'};

const bcrypt = require('bcryptjs');

//Error handler used by all.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/** User Authentication **/
// Register user
router.post('/register', function (req, res) {
  db.collection('users').findOne({'username': req.body.username}, function (err, user) {
    if (!user) {
      if (req.body.username !== '' && req.body.password !== '') {
        let hashedPassword = bcrypt.hashSync(req.body.password, 8);
        let new_user = new userModel({
          username: req.body.username,
          password: hashedPassword,
        });
        db.collection('users').save(new_user,
          function (err, docs) {
            if (err) {
              handleError(res, err);
            } else {
              let token = jwt.sign({id: userModel._id}, config.secret, {
                expiresIn: 86400
              });
              res.status(200).send({auth: true, token: token});
            }
          }
        );
      } else {
        res.status(409).send({message: "One of the fields are empty."});
      }
    } else {
      res.status(409).send({message: 'User already exist in the database'});
    }
  });
});

//Authenticate user
function authenticate(username, password, fn) {
  db.collection('users').findOne({'username': username}, function (err, user) {
    if (user !== null) {
      if (bcrypt.compareSync(password, user.password)) {
        return fn(null, user);
      } else {
        return fn(new Error('Invalid password'));
      }
    } else {
      return fn(new Error('User does not exist in database'));
    }
  });
}

//Verify Expiration
router.post('/login/verify', function (req, res) {
  let dateNow = new Date();
  let verifiedToken = jwt.decode(req.body.token, config.secret);
  let date = String(dateNow.getTime()).slice(0, 10);
  date = Number(date);
  if (verifiedToken.exp < date) {
    res.status(401).json({validation: false, message: 'Your session has expired, please login again'});
  } else {
    res.status(200).json({validation: true, message: 'Session has expired'});
  }
});

//Login
router.post('/login', function (req, res) {
  authenticate(req.body.username, req.body.password, function (err, user) {
    if (err) {
      res.status(401).send({auth: false, token: null, message: err.message});
    } else {
      let token = jwt.sign({id: user._id}, config.secret, {
        expiresIn: 86400
      });
      res.status(200).send({auth: true, token: token});
    }
  });
});

//Change password
router.post('/new_password', function (req, res) {
  let verifiedToken = jwt.verify(req.body.token, config.secret);
  db.collection('users').findOne({'_id': verifiedToken.id}, function (err, user) {
    if (user !== null) {
      if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
        user.password = bcrypt.hashSync(req.body.newPassword, 8);
        db.collection('users').save(user,
          function (err, docs) {
            if (err) {
              handleError(res, err);
            } else {
              res.status(200).json(docs);
            }
          }
        );
      } else {
        res.status(401).send({message: 'Wrong password!'});
      }
    }
  });
});

/** Favorites **/
//Get Favorite
router.post('/favorites', function (req, res) {
  let verifiedToken = jwt.verify(req.body.token, config.secret);
  db.collection('users').findOne({'_id': verifiedToken.id}, function (err, user) {
    if (err) {
      handleError(res, err.message, "Failed to find token.");
    }
    if (user !== null) {
      res.status(200).json(user.favorites);
    }
  });
});

//Get Favorites Movie Data
router.post('/favorites/data', function (req, res) {
  const favoriteList = req.body.favoriteList;
  db.collection('movies').find({_id: {$in: favoriteList}}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get favorites.");
    } else {
      res.status(200).json(docs);
    }
  });
});

//Check If Favorite Exists
router.post('/favorites/exists', function (req, res) {
  let exists = false;
  let verifiedToken = jwt.verify(req.body.token, config.secret);
  db.collection('users').findOne({'_id': verifiedToken.id}, function (err, user) {
    if (err) {
      handleError(res, err.message, "Failed to see if favorite exist");
    }
    if (user !== null) {
      if (user.favorites.indexOf(req.body.movie_id) >= 0) {
        exists = true;
      }
      res.status(200).json(exists);
    }
  });
});

//Modify Favorites
router.post('/favorites/modify', function (req, res) {
  let verifiedToken = jwt.verify(req.body.token, config.secret);
  db.collection('users').findOne({'_id': verifiedToken.id}, function (err, user) {
    if (user !== null) {
      if (req.body.newFavorite) {
        user.favorites.push(req.body.movie_id);
      } else {
        let index = user.favorites.indexOf(req.body.movie_id);
        if (index > -1) {
          user.favorites.splice(index, 1);
        }
      }
      db.collection('users').save(user,
        function (err, docs) {
          if (err) {
            handleError(res, err.message, "Failed to modify favorite");
          } else {
            res.status(200).json(docs);
          }
        }
      );
    }
  });
});

/** WordCloud **/
// Scan database and calculate genre data
router.get('/wordcloud', function (req, res) {
  let genreData = {};
  db.collection('movies').find().toArray(function (err, data) {
    for (let key in data) {
      let genreList = data[key].genre;
      for (let key2 in genreList) {
        let genre = genreList[key2];
        if (!genreData.hasOwnProperty(genre)) {
          genreData[genre] = 1;
        } else {
          genreData[genre] += 1;
        }
      }
    }
    if (err) {
      handleError(res, err.message, "Failed to get genres to wordcloud");
    } else {
      res.status(200).json(genreData);
    }
  });
});

// Uppercase first letter in each word and return regex to be searchable.
function splitElements(str) {
  if (str === undefined || str === '') {
    return {$exists: true}
  }
  str = str.split(' ');
  let newArr = '';
  for (let i = 0; i < str.length; i++) {
    // Add space between words.
    if (str.length > 1 && i > 0) {
      newArr += ' '
    }
    newArr += str[i].charAt(0).toUpperCase() + str[i].substr(1);
  }
  return {"$regex": newArr}
}

// Get start and end year to filter.
function splitYear(str) {
  if (str === undefined || str === '') {
    return [0, 9999];
  } else {
    return str.split("-").map((item) => {
      return parseInt(item.trim());
    });
  }
}

// Find what to sort on function
function getSortVariable(str, bool) {
  let num = 1;
  if (bool === 'true') {
    num = -1;
  }
  if (str === 'year') {
    return {'year': num}
  } else if (str === 'genre') {
    return {'genre': num}
  } else {
    return {'title': num}
  }
}

// Find genre and add them to a regex to be searchable.
function getGenres(genres) {
  if (genres === undefined || genres === '') {
    return ''
  }
  genres = genres.trim();
  if (genres.length > 0) {
    genres = genres.split(",").map((item) => {
      return item.trim()
    });
  }
  let genreElem = [];
  for (let genre of genres) {
    genreElem.push({genre: {$regex: ".*" + genre + ".*"}});
  }
  return genreElem;
}

// Get movies
router.get('/movies/list', function (req, res) {

  // Set all variables from get request
  let page = parseInt(req.query.page * req.query.limit);
  let limit = parseInt(req.query.limit);
  const have = req.query.have;
  const need = req.query.need;

  if (have !== undefined && need !== undefined) {
    page = parseInt(have);
    limit = parseInt(need);
  }
  const genre = getGenres(req.query.genre);
  const title = splitElements(req.query.title);
  const year = splitYear(req.query.year);
  const actors = splitElements(req.query.actors);
  const director = splitElements(req.query.director);
  const sort = getSortVariable(req.query.sort, req.query.desc);

  // Filter variables
  let filter = {
    title: title,
    year: {$gte: year[0], $lte: year[1]},
    actors: actors,
    director: director
  };
  if (genre.length > 0) {
    filter['$and'] = genre;
  }

  db.collection('movies').find(
    filter,
    // Remove properties from query
    {
      readMore: 0,
      plot: 0,
      runtime: 0
    })
  // Sort and limit matches
    .sort(sort).limit(limit).skip(page).toArray(function (err, docs) {

    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      res.status(200).json(docs);
    }
  });
});

// Get amount of movies matching search.
router.get('/movies/amount', function (req, res) {

  const genre = getGenres(req.query.genre);
  const title = splitElements(req.query.title);
  const year = splitYear(req.query.year);
  const actors = splitElements(req.query.actors);
  const director = splitElements(req.query.director);

  let filter = {
    title: title,
    year: {$gte: year[0], $lte: year[1]},
    actors: actors,
    director: director
  };
  if (genre.length > 0) {
    filter['$and'] = genre;
  }
  db.collection('movies').find(
    filter,
    {
      readMore: 0,
      plot: 0,
      runtime: 0,
      title: 0,
      poster: 0,
      actors: 0,
      director: 0,
      year: 0
    }).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get amount of movies.");
    } else {
      res.status(200).json(docs.length);
    }
  });
});


// Get detailed info for movies.
router.get('/movies/modal', function (req, res) {

  db.collection('movies').find(
    // Filter correct values
    {title: req.query.title},
    // Remove properties from query
    {
      title: 0,
      genre: 0,
      year: 0,
      actors: 0,
      director: 0,
    })
  // Sort and limit matches
    .sort().toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies with no actors.");
    } else {
      res.status(200).json(docs);
    }
  });
});

module.exports = router;
