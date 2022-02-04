import { GroupService } from '../services';

export class GroupController {
  constructor() {
    this.service = new GroupService();

    this.getById = this.getById.bind(this);
    this.getAlls = this.getAlls.bind(this);
    this.create = this.create.bind(this);
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      res.json(await this.service.getById(id));
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  async getAlls(req, res) {
    try {
      res.json(await this.service.getAll());
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  async create(req, res) {
    try {
      const { name } = req.body;
      if (name) {
        await this.service.create({ name });
        res.json({ status: 'Ok' });
      }
      res.status(400).send({ error: 'Bad Request' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  }
}
