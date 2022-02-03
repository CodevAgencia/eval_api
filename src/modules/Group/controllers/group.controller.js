import { GroupService } from '../services';

export class GroupController {
  static async getById(req, res) {
    try {
      const { id } = req.params;
      return GroupService.getById(id);
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  static async getAlls(req, res) {
    try {
      return GroupService.getAll();
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  static async create(req, res) {
    try {
      const { name, code } = req.body;
      if (name && code) {
        return GroupService.create({ name, code });
      }
      return res.status(400).send({ error: 'Bad Request' });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }
}
