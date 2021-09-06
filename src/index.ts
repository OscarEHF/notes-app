import app from './server';

// Starting the server
app
  .listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
  })
  .on('error', (err) => {
    console.log(err.stack);
  });