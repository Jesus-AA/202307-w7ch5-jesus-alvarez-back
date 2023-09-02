import cors from 'cors';
import express, { Response } from 'express';
import morgan from 'morgan';

export const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (res: Response) => {
  res.write('<h1>Bienvenidos a la red social</h1>');
  res.end();
});
