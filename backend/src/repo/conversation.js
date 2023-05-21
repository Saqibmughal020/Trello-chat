/** @format */

import Base from './base.js';
import conversationModel from '../db/models/conversationGroup.js';

class ConversationRepo extends Base {
  async createConversationGroup(data) {
    return this.createRecord(data);
  }
  async getMessage(data) {
    return this.getRecord(data);
  }
  async getMessageDataWithAggregation(query) {
    return this.getDataWithAggregation(query);
  }
}

export default new ConversationRepo(conversationModel);
