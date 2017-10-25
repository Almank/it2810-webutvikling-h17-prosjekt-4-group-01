const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MovieSchema = new Schema({
  title: { type: String, default: "undefined"},
  year: {type: Number, default: 0},
  runtime: {type: String, default: 'undefined'},
  genre: {type: String, default: 'undefined'},
  director: {type: String, default: 'undefined'},
  actors: {type: String, default: 'undefined'},
  plot: {type: String, default: 'undefined'},
  poster: {type: String, default: 'undefined'},
  readMore: { type: String, default: "undefined"},
});

//Todo: User, history

let Movie = mongoose.model('Movie', MovieSchema);

module.exports = {Movie};
