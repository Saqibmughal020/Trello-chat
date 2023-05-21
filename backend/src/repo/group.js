/** @format */

import Base from './base.js';
import GroupModel from '../db/models/group.js';

class GroupRepo extends Base {
  async createGroup(data) {
    return this.createRecord(data);
  }
  async updateGroup(query, data) {
    return this.updateRecord(query, data);
  }
  async getGroup(data) {
    return this.getRecord(data);
  }
  async getUserDataWithAggregation(query) {
    return this.getDataWithAggregation(query);
  }
}

export default new GroupRepo(GroupModel);
