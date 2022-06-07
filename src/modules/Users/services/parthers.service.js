import { Partner } from '../../../database/database';

export class PartnerService {
  static getById(id) {
    return Partner.findByPk(id);
  }

  static getByUserId(userId) {
    return Partner.findAll({
      where: { userId },
    });
  }

  static getPartnersByUserId(userId) {
    return Partner.find({
      where: { userId },
    });
  }

  static addPartner(userId, partner) {
    return Partner.findOrCreate({
      where: {
        name: partner,
        userId,
      },
    });
  }
}
