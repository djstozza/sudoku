import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let Score = new Schema({
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

export default mongoose.model('Score', Score);
