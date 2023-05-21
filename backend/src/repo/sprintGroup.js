/** @format */

import Base from './base.js';
import SprintModel from '../db/models/sprintGroup.js';

class SprintRepo extends Base {
  async createSprintGroup(data) {
    return this.createRecord(data);
  }
  async getMessage(data) {
    return this.getRecord(data);
  }
  async getMessageDataWithAggregation(query) {
    return this.getDataWithAggregation(query);
  }
}

export default new SprintRepo(SprintModel);
