import { Schema, model, ObjectId } from 'mongoose';
import bcryptjs from 'bcryptjs';

export interface IUser extends Document {
  id: ObjectId,
  name: string,
  email: string,
  password: string,
  encryptPassword: (password: string) => Promise<string>,
  matchPassword: (password: string) => Promise<boolean>
}

const User = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},
{
  versionKey: false
}
);

User.methods.encryptPassword = async (password): Promise<string> => {
  return bcryptjs.hash(password, 10);
};

User.methods.matchPassword = async function(password): Promise<boolean> {
  return await bcryptjs.compare(password, this.password);
};

export default model<IUser>('User', User);
