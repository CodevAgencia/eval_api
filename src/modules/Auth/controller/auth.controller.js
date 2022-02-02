import { AuthService } from '../services/auth.service';

export class AuthController {
  static async loginController(req, res){
    try {
      const { email, password } = req.body;
      const response = await AuthService.login(email, password);
      res.json(response);
    } catch (error) {
      res.status(401).send(error)
    }
  }
}
