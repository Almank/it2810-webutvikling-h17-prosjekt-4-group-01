const express = require('express');
const router = express.Router();
const server = require('./server');
const db = server.db;

const model = require('./models');
const movie = model.Movie;

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
    console.log('api works');
});

//Error handler used by all.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

// Get titles
router.get('/titles', function(req, res) {
    db.collection('titles').find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get titles.");
        } else {
            res.status(200).json(docs);
        }
    });
});

// Add info to Database
router.post('/titles', function(req,res) {
    db.collection('titles')
        .save({ title: req.body.title,
                link: req.body.link},
                function(err, docs) {
        if (err) {
            handleError(res, err);
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

module.exports = router;
