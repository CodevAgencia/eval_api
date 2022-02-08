import { Router } from 'express';

import { FormController } from './controllers';

const Controller = new FormController();

// api/form
export const FormRouter = new Router();

FormRouter.post('/save-responses', Controller.saveResponses);
FormRouter.post('/', Controller.getStatusAndQuestions);
