import { Router } from 'express';

import { GroupController } from './controllers';

// api/group
export const GroupRouter = new Router();

GroupRouter.get('/:id', GroupController.getById);
GroupRouter.get('/', GroupController.getAlls);

GroupRouter.post('/', GroupController.create);
