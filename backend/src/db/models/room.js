/** @format */

import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const roomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

roomSchema.plugin(MongooseDelete, { overrideMethods: 'all' });
const RoomModel = mongoose.model('Room', roomSchema);
export default RoomModel;
