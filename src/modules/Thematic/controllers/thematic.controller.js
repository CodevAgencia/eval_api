import { ThematicService } from '../services';

export class ThematicController {
  static async getById(req, res) {
    try {
      const { id } = req.params;
      return ThematicService.getById(id);
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  static async getByGroupId(req, res) {
    try {
      const { groupId } = req.params;
      return ThematicService.getAllWithFilter({ groupId });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  static async create(req, res) {
    try {
      const { groupId, name, code } = req.body;
      if (groupId && name && code) {
        return ThematicService.create({ groupId, name, code });
      }
      return res.status(400).send({ error: 'Bad Request' });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }
}
