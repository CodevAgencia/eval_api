import { Router } from 'express';

import { PartnerController } from './controllers';

const controller = new PartnerController();

// api/group
export const PartnerRouter = new Router();

PartnerRouter.get('/:userId', controller.getParthers);

PartnerRouter.post('/', controller.addPartners);
