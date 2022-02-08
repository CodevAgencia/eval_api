import { Service } from '../../../common';
import { User } from '../../../database/database';

export class UserService extends Service {
  constructor() {
    super(User);

    this.getByEmail = this.getByEmail.bind(this);
  }

  getByEmail(email) {
    return this.entity.findOne({
      where: { email },
    });
  }
}
