import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import exphbs from 'express-handlebars';

import indexRoutes from "./routes/index.routes";
import notesRoutes from "./routes/notes.routes";
import usersRoutes from "./routes/users.routes";

// Initializations
const app: Application = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '../src/views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.all('/favicon.ico', (req: Request, res: Response) => res.status(204).end());

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true })); //Return Nested Object
app.use(express.json());

// Routes
app.use('/', indexRoutes);
app.use('/notes', notesRoutes);
app.use('/users', usersRoutes);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

export default app;