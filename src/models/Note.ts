import { Schema, model, ObjectId } from 'mongoose';

interface INote {
  title: string,
  description: string,
  createdAt: string,
  updatedAt: string,
  timeago: string,
  user: Schema.Types.ObjectId,
  _id: ObjectId
}

const Note = new Schema<INote>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, { timestamps: true });

export default model<INote>('Note', Note);