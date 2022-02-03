import { Router } from 'express';

import { ThematicController } from './controllers';

// api/thematic
export const ThematicRouter = new Router();

ThematicRouter.get('/groupId/:groupId', ThematicController.getByGroupId);
ThematicRouter.get('/:id', ThematicController.getById);

ThematicRouter.post('/', ThematicController.create);
