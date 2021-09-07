require('dotenv').config();

import app from './server';
import './database';

// Starting the server
app
  .listen(app.get('port'), () => {
    console.log(`Server listening at http://localhost:${app.get('port')}`);
  })
  .on('error', (err) => {
    console.log(err.stack);
  });