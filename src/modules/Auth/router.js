import { Router } from 'express';

import { AuthController } from './controller/auth.controller';

export const AuthRouter = new Router();

AuthRouter.post('/', AuthController.loginController);
