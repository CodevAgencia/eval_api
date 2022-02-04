import { Router } from 'express';

import { ThematicController } from './controllers';

const Controller = new ThematicController();

// api/thematic
export const ThematicRouter = new Router();

ThematicRouter.get('/groupId/:groupId', Controller.getByGroupId);
ThematicRouter.get('/:id', Controller.getById);

ThematicRouter.post('/', Controller.create);
