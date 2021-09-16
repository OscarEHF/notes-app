import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
  name: string,
  email: string,
  password: string,
  encryptPassword: Function,
  matchPassword: Function
}

const User = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

User.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);
  return hash;
};

User.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', User);