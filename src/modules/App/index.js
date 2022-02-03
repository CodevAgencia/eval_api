import morgan from 'morgan';
import cors from 'cors';
import express, {json} from 'express';

import {AuthRouter } from '../Auth';

export const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(json());

app.use('/api/auth', AuthRouter);
app.get('/', (req, res) => {
  res.json({
    health: 'ok'
  })
});

