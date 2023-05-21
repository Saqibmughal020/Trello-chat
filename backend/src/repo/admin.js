/** @format */

import Base from './base.js';
import PlaceModel from '../db/models/place.js';

class PackageRepo extends Base {
  async createPlace(data) {
    return this.createRecord(data);
  }

  async getPlaces(query) {
    return this.getRecords(query);
  }

  async getPlace(query) {
    query = {
      placeType: query.placeType,
      placeName: { $regex: query.placeName },
    };
    return this.getRecord(query);
  }

  async updatePlace(query, body) {
    return this.updateRecord(query, body);
  }

  async deletePlace(query) {
    return this.deleteRecord(query);
  }
}

export default new PackageRepo(PlaceModel);
