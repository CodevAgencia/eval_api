import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { UserService } from '../../Users';

export class AuthService {
  static validateToken(token) {
    const { id, status } = jwt.verify(token, 'secret');
    return { id, status };
  }

  static async login(email, password) {
    try {
      const { id, password: hash, status } = await UserService.getByEmail(email);
      if (id && this.validatePassword(password, hash)) {
        return {
          token: jwt.sign({ id, status }, 'secret'),
        };
      }
      throw new Error('Credenciales incorrectas');
    } catch (error) {
      throw new Error('Credenciales incorrectas');
    }
  }

  static async refresh(token) {
    try {
      const { id } = this.validateToken(token);
      if (id) {
        const { status } = await UserService.getById(id);
        return {
          token: jwt.sign({ id, status }, 'secret'),
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
