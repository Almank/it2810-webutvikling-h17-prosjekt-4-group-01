const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  id: { type: Number, default: null},
  link: { type: String, default: "/"},
  title: { type: String, default: "undefined movie"},
});

const Movie = mongoose.model('Movie', MovieSchema);

module.exports.Movie = Movie;
