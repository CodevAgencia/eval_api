import { Partner } from '../../../database/database';

export class PartnerService {
  static getById(id) {
    return Partner.findByPk(id);
  }

  static getByUserId(userId) {
    return Partner.findOne({
      where: { userId },
    });
  }

  static getPartnersByUserId(userId) {
    return Partner.find({
      where: { userId },
    });
  }

  static addPartner(userId, partner) {
    return Partner.create({
      name: partner,
      userId,
    });
  }
}
