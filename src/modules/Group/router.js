import { Router } from 'express';

import { GroupController } from './controllers';

const Controller = new GroupController();

// api/group
export const GroupRouter = new Router();

GroupRouter.get('/:id', Controller.getById);
GroupRouter.get('/', Controller.getAlls);

GroupRouter.post('/', Controller.create);
