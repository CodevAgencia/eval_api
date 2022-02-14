import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { UserService } from '../../Users';

export class AuthService {
  constructor() {
    this.userService = new UserService();

    this.validateToken = this.validateToken.bind(this);
    this.login = this.login.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  // eslint-disable-next-line class-methods-use-this
  validateToken(token) {
    const { id, status } = jwt.verify(token, 'secret');
    return { id, status };
  }

  async login(email, password) {
    try {
      const {
        id, password: hash, status, role,
      } = await this.userService.getByEmail(email);
      if (id && this.validatePassword(password, hash)) {
        return {
          token: jwt.sign({ id, status, role }, 'secret'),
        };
      }
      throw new Error('Credenciales incorrectas');
    } catch (error) {
      throw new Error('Credenciales incorrectas');
    }
  }

  async refresh(token) {
    try {
      const { id } = this.validateToken(token);
      if (id) {
        const { status, role } = await this.userService.getById(id);
        return {
          token: jwt.sign({ id, status, role }, 'secret'),
        };
      }
      throw new Error('Credenciales incorrectas');
    } catch (error) {
      throw new Error('Credenciales incorrectas');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  validatePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}
