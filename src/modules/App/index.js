import morgan from 'morgan';
import express, {json} from 'express';

import {AuthRouter } from '../Auth';

export const app = express();

app.use(morgan('dev'));
app.use(json());

app.use('/api/auth', AuthRouter);
