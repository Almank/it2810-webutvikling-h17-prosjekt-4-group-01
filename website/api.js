const express = require('express');
const router = express.Router();
const server = require('./server');
const db = server.db;
const model = require('./models');

const userModel = model.User;
const jwt = require('jsonwebtoken');
const config = {'secret': 'supersecretkey'};

const bcrypt = require('bcryptjs');

function splitElements(str) {
  if (str === '' || str === undefined){
      return {$exists:true};
  } else {
      return {$in: str.split(",").map((item) => {
        return item.trim()})
    }
  }
}

function splitYear(str) {
  if (str === undefined || str === '') {
    return [0, 9999];
  } else {
    return str.split("-").map((item) => {
      return parseInt(item.trim());
    });
  }
}

// GET api listing.
router.get('/', (req, res) => {
    res.send('api works');
});

//Error handler used by all.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

// Register user
router.post('/register', function(req, res){
    db.collection('users').findOne({'username': req.body.username}, function (err, user) {
      if (!user){
        if (req.body.username !== '' && req.body.password !== ''){
          let hashedPassword = bcrypt.hashSync(req.body.password, 8);
          let new_user = new userModel({
            username: req.body.username,
            password: hashedPassword,
          });
          db.collection('users').save(new_user,
            function(err, docs) {
              if (err) {
                handleError(res, err);
              } else {
                let token = jwt.sign({ id: userModel._id }, config.secret, {
                  expiresIn: 86400
                });
                res.status(200).send({ auth: true, token: token });
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
    if(user !== null) {
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

// Login
router.post('/login', function(req, res){
    authenticate(req.body.username, req.body.password, function (err, user) {
      if (err){
        res.status(401).send({ auth: false, token: null, message: err.message});
      } else {
        let token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token});
      }
    });
});

//Change password
router.post('/new_password', function (req, res) {
  let verifiedToken = jwt.verify(req.body.token, config.secret);
  db.collection('users').findOne({'_id': verifiedToken.id}, function (err, user) {
    if(user !== null) {
      if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
        user.password = bcrypt.hashSync(req.body.newPassword, 8);
        db.collection('users').save(user,
          function(err, docs) {
            if (err) {
              handleError(res, err);
            }else {
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

function getSortVariable(str, bool) {
    let num = 1;
    if (bool === 'true') {
        num = -1;
    }
    if (str === 'year'){
      return {'year': num}
    } else if (str === 'genre'){
      return {'genre': num}
    } else {
      return {'title': num}
    }
}

// Get movies
router.get('/movies/list', function(req, res) {

    let page = parseInt(req.query.page * req.query.limit);
    let limit = parseInt(req.query.limit);
    const have = req.query.have;
    const need = req.query.need;

    if (have !== undefined && need !== undefined){
      page = parseInt(have);
      limit = parseInt(need);
    }
    const genre = splitElements(req.query.genre);
    const title = splitElements(req.query.title);
    const year = splitYear(req.query.year);
    const actors = splitElements(req.query.actors);
    const director = splitElements(req.query.director);
    const sort = getSortVariable(req.query.sort, req.query.desc);

    db.collection('movies').find(
      // Filter correct values
      { title: title,
        genre: genre,
        year: { $gte: year[0], $lte: year[1] },
        actors: actors,
        director: director },
      // Remove properties from query
      { poster: 0,
        readMore: 0,
        plot: 0,
        runtime: 0
      })
      // Sort and limit matches
      .sort(sort).limit(limit).skip(page).toArray(function(err, docs) {

      if (err) {
        handleError(res, err.message, "Failed to get movies with no actors.");
      } else {
        res.status(200).json(docs);
      }
    });
});

router.get('/movies/modal', function(req, res) {

  db.collection('movies').find(
    // Filter correct values
    { title: req.query.title },
    // Remove properties from query
    {
      title: 0,
      readMore: 0,
      genre: 0,
      year: 0,
      actors: 0,
      director: 0,
    })
  // Sort and limit matches
    .sort().toArray(function(err, docs) {

    if (err) {
      handleError(res, err.message, "Failed to get movies with no actors.");
    } else {
      res.status(200).json(docs);
    }
  });
});

module.exports = router;
