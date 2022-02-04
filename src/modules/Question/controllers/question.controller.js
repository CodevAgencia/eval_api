import { QuestionService } from '../services';

export class QuestionController {
  constructor() {
    this.service = new QuestionService();

    this.create = this.create.bind(this);
    this.getByThematicId = this.getByThematicId.bind(this);
    this.getById = this.getById.bind(this);
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      res.json(await this.service.getById(id));
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  async getByThematicId(req, res) {
    try {
      const { thematicId } = req.params;
      res.json(await this.service.getAllWithFilter({ thematicId }));
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  async create(req, res) {
    try {
      const {
        code,
        type,
        order,
        values,
        question,
        criterion,
        thematicId,
        observation,
        adequatePerformance,
      } = req.body;
      if (thematicId && question && code && criterion && type && order) {
        await this.service.create({
          code,
          type,
          order,
          values,
          question,
          criterion,
          thematicId,
          observation,
          adequatePerformance,
        });
        res.send({ status: 'Ok' });
        return;
      }
      res.status(400).send({ error: 'Bad Request' });
    } catch (error) {
      res.status(500).send({ error });
    }
  }
}
