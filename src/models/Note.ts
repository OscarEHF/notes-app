import { Schema, model } from 'mongoose';

interface INote {
  title: string,
  description: string,
  createdAt: string,
  updatedAt: string,
  timeago: string,
  _id: string
}

const Note = new Schema<INote>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default model<INote>('Note', Note);