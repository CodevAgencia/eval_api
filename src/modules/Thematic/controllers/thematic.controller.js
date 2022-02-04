import { ThematicService } from '../services';

export class ThematicController {
  constructor() {
    this.service = new ThematicService();

    this.create = this.create.bind(this);
    this.getByGroupId = this.getByGroupId.bind(this);
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

  async getByGroupId(req, res) {
    try {
      const { groupId } = req.params;
      res.json(await this.service.getAllWithFilter({ groupId }));
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  async create(req, res) {
    try {
      const { groupId, name, code } = req.body;
      if (groupId && name && code) {
        await this.service.create({ groupId, name, code });
        res.send({ status: 'Ok' });
        return;
      }
      res.status(400).send({ error: 'Bad Request' });
    } catch (error) {
      res.status(500).send({ error });
    }
  }
}
