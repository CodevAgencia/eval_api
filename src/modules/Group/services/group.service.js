import { Service } from '../../../common';
import { Group } from '../../../database/database';

export class GroupService extends Service {
  constructor() {
    super(Group);
  }
}
