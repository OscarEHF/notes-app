import mongoose from 'mongoose';

const { MONGODB_HOST, MONGODB_DATABASE } = process.env;

const MONGODB_URI = `
  mongodb://${MONGODB_HOST ? MONGODB_HOST : 'localhost'}/${MONGODB_DATABASE ? MONGODB_DATABASE : 'test-app'}
`;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Database is connected'))
  .catch((err: Error) => console.error(err));