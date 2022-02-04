import { FormService } from '../services';

export class FormController {
  constructor() {
    this.service = new FormService();

    this.getStatusAndQuestions = this.getStatusAndQuestions.bind(this);
  }

  async getStatusAndQuestions(req, res) {
    try {
      const { status, userId } = req.body;
      res.json(await this.service.getQuestionOfStatus(status, userId));
    } catch (error) {
      console.log('🚀 ~ file: form.controller.js ~ line 15 ~ FormController ~ getStatusAndQuestions ~ error', error);
      res.status(500).json(error);
    }
  }
}
