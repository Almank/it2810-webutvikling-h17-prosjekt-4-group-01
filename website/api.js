const express = require('express');
const router = express.Router();
const server = require('./server');
const db = server.db;

const model = require('./models');
const movie = model.Movie;
const user = model.User;

const categories = ['Action', 'Animation', 'Comedy', 'Documentary', 'Family', 'Film-Noir',
  'Horror', 'Musical', 'Romance', 'Sport', 'War', 'Adventure', 'Biography',
  'Crime', 'Drama', 'Fantasy', 'History', 'Music', 'Mystery', 'Sci-Fi',
  'Thriller', 'Western'];

function splitElements(str) {
  if (str !== undefined){
    return str.split(",").map((item) => {
      return item.trim();
    })
  }
}

function splitYear(str) {
  if (str !== undefined) {
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

// Get movies
router.get('/movies', function(req, res) {
    const page = parseInt(req.query.page * 25);
    const limit = parseInt(req.query.limit);
    let year = splitYear(req.query.year);

    if (year === undefined || req.query.year === ''){
      year = [0,9999]
    }

    let genre = splitElements(req.query.genre);
    if (req.query.genre === '' || req.query.genre === undefined){
      genre = categories
    }

    let actors = req.query.actors;
    if (actors === undefined || actors === '') {
      actors = {$exists:true};
    } else {
      actors = {$in: splitElements(req.query.actors)};
    }

    let director = req.query.director;
    if (director === undefined || director === '') {
      director = {$exists:true};
    } else {
      director = {$in: splitElements(req.query.director)};
    }

    db.collection('movies').find(
      // Filter correct values
      { genre: { $in: genre },
        year: { $gte: year[0], $lte: year[1] },
        actors: actors,
        director: director },
      // Remove properties from query
      { poster: 0,
        readMore: 0,
        plot: 0,
        actors: 0,
        director: 0,
        runtime: 0
      })
      // Sort and limit matches
      .sort().limit(limit).skip(page).toArray(function(err, docs) {

      if (err) {
        handleError(res, err.message, "Failed to get movies with no actors.");
      } else {
        res.status(200).json(docs);
      }
    });
});

module.exports = router;
