/** @format */

import Base from './base.js';
import GroupModel from '../db/models/group.js';

class GroupRepo extends Base {
  async createMessage(data) {
    return this.createRecord(data);
  }
  async getMessage(data) {
    return this.getRecord(data);
  }
  async getMessageDataWithAggregation(query) {
    return this.getDataWithAggregation(query);
  }
}

export default new GroupRepo(GroupModel);
