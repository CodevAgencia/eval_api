import { GroupService } from '../../Group';
import { ThematicService } from '../../Thematic';
import { QuestionService } from '../../Question';
import { ResponseService } from '../../Response';

export class FormService {
  constructor() {
    this.groupService = new GroupService();
    this.thematicService = new ThematicService();
    this.questionService = new QuestionService();
    this.responseService = new ResponseService();

    this.getQuestionOfStatus = this.getQuestionOfStatus.bind(this);
  }

  async getResponseOfQuestion(questionId, userId) {
    return this.responseService.getOne({
      questionId,
      userId,
    });
  }

  async getQuestionOfStatus(status, userId) {
    const group = await this.groupService.getById(status);
    if (!group) {
      throw new Error('Este grupo no existe');
    }
    const thematics = await this.thematicService.getAllWithFilter({ groupId: status });
    return Promise.all(thematics.map(async (t) => {
      const questions = await this.questionService.getAllWithFilter({ thematicId: t.id });
      const merges = await Promise.all(questions.map(async (q) => ({
        id: q.id,
        code: q.code,
        criterion: q.criterion,
        question: q.question,
        type: q.type,
        values: q.values,
        order: 1,
        thematicId: 1,
        response: await this.getResponseOfQuestion(q.id, userId),
      })));
      return {
        thematic: {
          id: t.id,
          name: t.name,
          code: t.code,
          groupId: t.groupId,
          questions: merges.sort(((a, b) => a.order - b.order)),
        },
      };
    }));
  }

  async saveResponses({ responses, userId }) {
    const registerToSave = responses.map((r) => ({
      id: r.id,
      questionId: r.questionId,
      value: r.value,
      userId,
    }));
    await Promise.all(registerToSave.map((r) => this.responseService.updateOrCreate(r.id, {
      questionId: r.questionId,
      value: r.value,
      userId,
    })));
  }
}
