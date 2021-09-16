import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
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
});

User.methods.encryptPassword = async (password): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

User.methods.matchPassword = async function(password): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', User);