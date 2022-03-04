import { Service } from '../../../common';
import { ResponseService } from '../../Response';
import { User } from '../../../database/database';

const GROUPS_FORM = [
  'No Iniciado',
  'Datos Generales',
  'Equipo',
  'Idea y Modelo de Negocio',
  'Producto',
  'Mercado',
  'Compañia',
  'Oportunidad de Inversión',
  'Completado',
];

export class UserService extends Service {
  constructor() {
    super(User);
    this.responseService = new ResponseService();

    this.getByEmail = this.getByEmail.bind(this);
    this.getAllEntrepreneurs = this.getAllEntrepreneurs.bind(this);
  }

  getByEmail(email) {
    return this.entity.findOne({
      where: { email },
    });
  }

  async getAllEntrepreneurs() {
    const users = await this.entity.findAll({
      where: {
        role: null,
      },
    });
    return Promise.all(users.map(async (user) => {
      const response = await this.responseService.getOne({
        questionId: 1,
        userId: user.id,
      });
      return {
        id: user.id,
        name: response?.value,
        email: user.email,
        createdAt: user.updatedAt,
        status: GROUPS_FORM[user.status],
      };
    }));
  }
}
