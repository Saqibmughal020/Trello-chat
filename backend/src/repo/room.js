/** @format */

import Base from './base.js';
import RoomModel from '../db/models/room.js';

class RoomRepo extends Base {
  async getRoom(data) {
    return this.getRecord(data);
  }
  async createRoom(data) {
    return this.createRecord(data);
  }
  async updateRoom(query, data) {
    return this.updateRecord(query, data);
  }
  async getRoomDataWithAggregation(query) {
    return this.getDataWithAggregation(query);
  }
}

export default new RoomRepo(RoomModel);
