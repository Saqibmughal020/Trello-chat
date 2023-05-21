/** @format */

import Base from './base.js';
import GroupMessageModel from '../db/models/groupmessage.js';

class GroupMessageRepo extends Base {
  async createGroupMessage(data) {
    return this.createRecord(data);
  }
  async getMessage(data) {
    return this.getRecord(data);
  }
  async getMessageDataWithAggregation(query) {
    return this.getDataWithAggregation(query);
  }
}

export default new GroupMessageRepo(GroupMessageModel);
