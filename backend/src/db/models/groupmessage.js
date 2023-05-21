import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const groupMessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
  chatType: {
    type: String,
  },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

groupMessageSchema.plugin(MongooseDelete, { overrideMethods: 'all' });
const GroupMessageModel = mongoose.model('GroupMessage', groupMessageSchema);

export default GroupMessageModel;
