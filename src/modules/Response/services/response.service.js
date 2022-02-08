import { Service } from '../../../common';
import { Response } from '../../../database/database';

export class ResponseService extends Service {
  constructor() {
    super(Response);

    this.updateOrCreate = this.updateOrCreate.bind(this);
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
}
