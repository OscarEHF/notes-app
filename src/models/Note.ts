import mongoose, { Schema } from 'mongoose';

const Note = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model('Note', Note);