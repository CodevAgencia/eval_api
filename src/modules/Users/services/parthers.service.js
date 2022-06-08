import { Service } from '../../../common';
import { Partner } from '../../../database/database';

export class PartnerService extends Service {
  constructor() {
    super(Partner);
  }

  getById(id) {
    return this.entity.findByPk(id);
  }

  getByUserId(userId) {
    return this.entity.findAll({
      where: { userId },
    });
  }

  getPartnersByUserId(userId) {
    return this.entity.find({
      where: { userId },
    });
  }

  addPartner(userId, partner) {
    return this.entity.findOrCreate({
      where: {
        name: partner,
        userId,
      },
    });
  }

  removePartners(userId) {
    return this.entity.destroy({
      where: { userId },
    });
  }
}
