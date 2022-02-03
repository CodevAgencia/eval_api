import morgan from 'morgan';
import cors from 'cors';
import express, { json } from 'express';

import { AuthRouter } from '../Auth';
import { ThematicRouter } from '../Thematic';
import { GroupRouter } from '../Group';
import { PartnerRouter } from '../Users';

export const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(json());

app.use('/api/auth', AuthRouter);
app.use('/api/thematic', ThematicRouter);
app.use('/api/group', GroupRouter);
app.use('/api/partner', PartnerRouter);

app.get('/', (req, res) => {
  res.json({
    health: 'ok',
  });
});
