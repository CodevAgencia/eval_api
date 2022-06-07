import { Router } from 'express';

import { UserController } from './controllers';

// api/user
const controller = new UserController();
export const UserRouter = new Router();

UserRouter.get('/entrepreneurs', controller.getAllEntrepreneurs);
UserRouter.get('/results/:userId', controller.getResults);
