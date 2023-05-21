/** @format */

import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

messageSchema.plugin(MongooseDelete, { overrideMethods: 'all' });
const MessageModel = mongoose.model('Message', messageSchema);

module.exports = MessageModel;
