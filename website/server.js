const path = require('path');
const express = require('express');
      app = express(),
      port = process.env.PORT || 8084;

const router = require('./api');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.use('/api', router);

app.listen(port);

console.log('RESTful API server started on: ' + port);
