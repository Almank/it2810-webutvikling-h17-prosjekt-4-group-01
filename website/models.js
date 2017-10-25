const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MovieSchema = new Schema({
  link: { type: String, default: "/"},
  title: { type: String, default: "undefined movie"},
});

let Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
