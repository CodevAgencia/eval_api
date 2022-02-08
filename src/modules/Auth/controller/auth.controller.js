import { AuthService } from '../services/auth.service';

export class AuthController {
  constructor() {
    this.authService = new AuthService();

    this.loginController = this.loginController.bind(this);
    this.refeshController = this.refeshController.bind(this);
  }

  async loginController(req, res) {
    try {
      const { email, password } = req.body;
      const response = await this.authService.login(email, password);
      res.json(response);
    } catch (error) {
      res.status(401).send(error);
    }
  }

  async refeshController(req, res) {
    try {
      const { token } = req.body;
      const response = await this.authService.refresh(token);
      res.json(response);
    } catch (error) {
      res.status(401).send(error);
    }
  }
}
