import { Service } from '../../../common';
import { Response, Question, Thematic } from '../../../database/database';

export class ResponseService extends Service {
  constructor() {
    super(Response);

    this.updateOrCreate = this.updateOrCreate.bind(this);
    this.findAllWithResponse = this.findAllWithResponse.bind(this);
  }

  async updateOrCreate(id, data) {
    const exist = await (
      id ? this.getById(id) : this.getOne({ userId: data.userId, questionId: data.questionId })
    );
    if (exist) {
      await this.update({
        id: exist.id,
        value: exist.value,
        userId: exist.userId,
        questionId: exist.questionId,
        ...data,
      }, {
        id: exist.id,
      });
      return;
    }
    await this.entity.create(data);
  }

  findAllWithResponse(userId, thematic) {
    return this.entity.findAll({
      where: {
        userId,
      },
      include: [{
        model: Question,
        required: true,
        include: [{
          model: Thematic,
          required: true,
          where: {
            id: thematic,
          },
        }],
      }],
    });
  }
}
