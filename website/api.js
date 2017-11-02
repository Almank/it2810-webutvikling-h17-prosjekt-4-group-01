const express = require('express');
const router = express.Router();
const server = require('./server');
const db = server.db;

const model = require('./models');
const movie = model.Movie;

const user = model.User;
const jwt = require('jsonwebtoken');
const config = {'secret': 'supersecretkey'};

const bcrypt = require('bcryptjs');

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
    if (req.body.username !== '' && req.body.password !== ''){
        let hashedPassword = bcrypt.hashSync(req.body.password, 8);
        let new_user = new user({
            username: req.body.username,
            password: hashedPassword,
        });
        db.collection('users').save(new_user,
            function(err, docs) {
                if (err) {
                    handleError(res, err);
                } else {
                    let token = jwt.sign({ id: user._id }, config.secret, {
                      expiresIn: 86400
                    });
                    res.status(200).send({ auth: true, token: token });
                }
            }
        );
    } else {
        handleError(res, "Invalid fieldinput.");
    }
});

//Authenticate user
function authenticate(username, password, fn) {
  db.collection('users').findOne({'username': username}, function (err, user) {
    if(user !== null) {
      if (bcrypt.compareSync(password, user.password)) {
        return fn(null, user);
      } else {
        return fn('invalid password');
      }
    } else {
      return fn(new Error('user does not exist in database'));
    }
  });
}

// Login
router.post('/login', function(req, res){
    authenticate(req.body.username, req.body.password, function (err, user) {
      if (err){
        res.status(401).send({ auth: false, token: null });
      } else {

        let token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token});
      }
    });
});

// Add movie to database
router.post('/movies', function (req, res) {
    let new_movie = new movie({
        title: req.body.title,
        year: req.body.year,
        runtime: req.body.runtime,
        genre: req.body.genre,
        director: req.body.director,
        actors: req.body.actors,
        plot: req.body.plot,
        poster: req.body.poster,
        readMore: req.body.readMore,
    });
    db.collection('movies').save(new_movie,
        function(err, docs) {
            if (err) {
                handleError(res, err);
            } else {
                res.status(200).json(docs);
            }
        }
    );
});

// Get movies
router.get('/movies', function(req, res) {
    const page = req.query.page * 25;
    const limit = parseInt(req.query.limit);
    db.collection('movies').find({}).sort().limit(limit).skip(page).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get movies.");
        } else {
            res.status(200).json(docs);
        }
    });
});

// Get movies title ascending
router.get('/movies/asc', function(req, res) {
  const page = req.query.page * 25;
  const limit = parseInt(req.query.limit);
  db.collection('movies').find({}).sort({'title': 1}).limit(limit).skip(page).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      res.status(200).json(docs);
    }
  });
});

// Get movies title descending
router.get('/movies/desc', function(req, res) {
  const page = req.query.page * 25;
  const limit = parseInt(req.query.limit);
  db.collection('movies').find({}).sort({'title': -1}).limit(limit).skip(page).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      res.status(200).json(docs);
    }
  });
});

// Get movies asc year
router.get('/movies/year/asc', function(req, res) {
  const page = req.query.page * 25;
  const limit = parseInt(req.query.limit);
  db.collection('movies').find({}).sort({'year': 1}).limit(limit).skip(page).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      res.status(200).json(docs);
    }
  });
});

// Get movies asc year
router.get('/movies/year/desc', function(req, res) {
  const page = req.query.page * 25;
  const limit = parseInt(req.query.limit);
  db.collection('movies').find({}).sort({'year': -1}).limit(limit).skip(page).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      res.status(200).json(docs);
    }
  });
});

module.exports = router;
