import { Service } from '../../../common';
import { Question } from '../../../database/database';

export class QuestionService extends Service {
  constructor() {
    super(Question);
  }
}
