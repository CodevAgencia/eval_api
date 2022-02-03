import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { UserService } from '../../Users';

export class AuthService {
  static async login(email, password) {
    try {
      const { id, password: hash } = await UserService.getByEmail(email);
      if (id && this.validatePassword(password, hash)) {
        return {
          token: jwt.sign({ id }, 'secret'),
        };
      }
      throw new Error('Credenciales incorrectas');
    } catch (error) {
      throw new Error('Credenciales incorrectas');
    }
  }

  static validatePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}
