import { Router } from 'express';

import { PartnerController } from './controllers';

// api/group
export const PartnerRouter = new Router();

PartnerRouter.get('/:userId', PartnerController.getParthers);

PartnerRouter.post('/', PartnerController.addPartners);
