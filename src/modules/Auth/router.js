import { Router } from 'express';

import { AuthController } from './controller/auth.controller';

const controller = new AuthController();

export const AuthRouter = new Router();

AuthRouter.post('/refresh', controller.refeshController);
AuthRouter.post('/', controller.loginController);
