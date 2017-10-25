const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

let model = require('./models');

//connect to database: movies
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/movies', { useMongoClient: true });
const db = mongoose.connection;

//Check if connected to database
db.on('error', err => {
  console.log('Error while connecting to DB: ${err.message}') ;
});
db.once('open', () => {
  console.log('Server connected successfully to DB!');
});

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

module.exports = router;
