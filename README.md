# notes-app

A very simple notes app using Node.js, MongoDB, Typescript and JavaScript Technologies. Plus authentication using passport.

## Requirements

- [Node.js](https://nodejs.org/en/), **v16.3.0**
- [npm](https://www.npmjs.com/get-npm), **v6.14.11**
- [MongoDB](https://www.mongodb.com/), **v4.2.10**

## First Steps

### Installation

Clone this repo

```bash
git clone git@github.com:OscarEHF/notes-app.git
cd notes-app
```

### Run this project:

All dependencies will be installed automatically.

```bash
npm install # install all the dependecies
# or
yarn

npm run dev # start application
# or
yarn dev
```

Server listening at `http://localhost:3000`

### Environment Variables

This app needs the following environment variables

- `PORT` This is the port of the server, by default is **3000** at `server.ts:21` with `app.set('port', process.env.PORT || 3000);`
- `MONGODB_HOST` This is the Mongodb URI string
- `MONGODB_DATABASE` This is the Mongodb database name

## Further help

To get more help on the Express Server go check out the [Express.js Repository](https://github.com/expressjs/express) or the [Express.js Website and Documentation](http://expressjs.com/)
