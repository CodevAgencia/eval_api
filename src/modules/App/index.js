import cors from 'cors';
import morgan from 'morgan';
import express, { json } from 'express';

import { FormRouter } from '../Form';
import { AuthRouter } from '../Auth';
import { GroupRouter } from '../Group';
import { PartnerRouter } from '../Users';
import { QuestionRouter } from '../Question';
import { ThematicRouter } from '../Thematic';

export const app = express();

app.use(cors());
app.use(json());
app.use(morgan('dev'));

app.use('/api/auth', AuthRouter);
app.use('/api/form', FormRouter);
app.use('/api/thematic', ThematicRouter);
app.use('/api/group', GroupRouter);
app.use('/api/partner', PartnerRouter);
app.use('/api/question', QuestionRouter);

app.get('/', (req, res) => {
  res.json({
    health: 'ok',
  });
});
