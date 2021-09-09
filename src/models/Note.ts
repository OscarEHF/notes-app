import mongoose, { Schema } from 'mongoose';

const Note = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Note', Note);