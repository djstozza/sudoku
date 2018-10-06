const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let scoreSchema = new Schema({
  name: {
    type: String
  },
  difficulty: {
    type: String
  },
  time: {
    type: Number
  }
});

let Score = mongoose.model('Score', scoreSchema);

module.exports = Score;
