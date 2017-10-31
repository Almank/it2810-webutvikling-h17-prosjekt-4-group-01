const express = require('express');
const router = express.Router();
const server = require('./server');
const db = server.db;

const model = require('./models');
const movie = model.Movie;
const user = model.User;

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
        let new_user = new user({
            username: req.body.username,
            password: req.body.password,
        });
        db.collection('users').save(new_user,
            function(err, docs) {
                if (err) {
                    handleError(res, err);
                } else {
                    res.status(200).json(docs);
                }
            }
        );
    } else {
        handleError(res, "Invalid fieldinput.");
    }
});

// Login
router.post('/login', function(req, res){
    db.collection('users').find({
        'username' : req.body.username,
        'password' : req.body.password,
    }).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to login.");
        } else {
            res.status(200).json(docs);
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
    db.collection('movies').find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get movies.");
        } else {
            res.status(200).json(docs);
        }
    });
});

// Get movies title ascending
router.get('/movies/asc', function(req, res) {
  db.collection('movies').find({}).sort({'title': 1}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      res.status(200).json(docs);
    }
  });
});

// Get movies title descending
router.get('/movies/desc', function(req, res) {
  db.collection('movies').find({}).sort({'title': -1}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      res.status(200).json(docs);
    }
  });
});

// Get movies asc year
router.get('/movies/year/asc', function(req, res) {
  db.collection('movies').find({}).sort({'year': 1}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      res.status(200).json(docs);
    }
  });
});

// Get movies asc year
router.get('/movies/year/desc', function(req, res) {
  db.collection('movies').find({}).sort({'year': -1}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get movies.");
    } else {
      res.status(200).json(docs);
    }
  });
});

module.exports = router;
