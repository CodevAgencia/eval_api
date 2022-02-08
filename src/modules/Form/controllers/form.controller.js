import { FormService } from '../services';
import { UserService } from '../../Users';

export class FormController {
  constructor() {
    this.service = new FormService();
    this.userService = new UserService();

    this.getStatusAndQuestions = this.getStatusAndQuestions.bind(this);
    this.saveResponses = this.saveResponses.bind(this);
  }

  async getStatusAndQuestions(req, res) {
    try {
      const { status, userId } = req.body;
      res.json(await this.service.getQuestionOfStatus(status, userId));
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async saveResponses(req, res) {
    try {
      const { responses, newStatus, userId } = req.body;
      await this.service.saveResponses({ responses, userId });
      if (newStatus) {
        await this.userService.update({ status: newStatus }, { id: userId });
      }
      res.json({ status: 'Ok' });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
