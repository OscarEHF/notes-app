import express, { Application, NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import exphbs from 'express-handlebars';
import methodOverride from 'method-override';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';

import './passport';

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

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global variables
app.use((req: Request, res: Response, next: NextFunction): void => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  res.locals.url = req.url;
  next();
});

// Routes
app.use('/', indexRoutes);
app.use('/notes', notesRoutes);
app.use('/users', usersRoutes);

// Static files
app.use(express.static(path.join(__dirname, '../src/public')));

// Intentional error
app.use('/error-msg', (req: Request, res: Response) => {
  res.render('errrrrrrrrr');
});

// 404 handler
app.use((req: Request, res: Response) =>{
  res.status(404).render('404');
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).render('error');
});

export default app;
