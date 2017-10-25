const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const server = require('./server');
const db = server.db;

let model = require('./models');

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
