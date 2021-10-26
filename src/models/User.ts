import { Schema, model, ObjectId } from 'mongoose';
import bcryptjs from 'bcryptjs';

export interface IUser {
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
  const salt = await bcryptjs.genSalt(10);
  const hash = bcryptjs.hash(password, salt);
  return hash;
};

User.methods.matchPassword = async function(password): Promise<boolean> {
  return await bcryptjs.compare(password, this.password);
};

export default model<IUser>('User', User);
