import { User } from '../../../database/database';

export class UserService {
  static getById(id) {
    return User.findByPk(id);
  }

  static getByEmail(email) {
    return User.findOne({
      where: { email }
    })
  }
}
