import { Router } from 'express';

import { AuthController } from './controller/auth.controller';

export const AuthRouter = new Router();

AuthRouter.post('/refresh', AuthController.refeshController);
AuthRouter.post('/', AuthController.loginController);
