import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Initializations
const app: Application = express();

// Settings
app.set('port', process.env.PORT || 3000);

app.all('/favicon.ico', (req, res) => res.status(204).end());

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true })); //Return Nested Object
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;