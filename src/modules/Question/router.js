import { Router } from 'express';

import { QuestionController } from './controllers';

const Controller = new QuestionController();

// api/question
export const QuestionRouter = new Router();

QuestionRouter.get('/thematicId/:thematicId', Controller.getByThematicId);
QuestionRouter.get('/:id', Controller.getById);

QuestionRouter.post('/', Controller.create);
