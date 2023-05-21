import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  groupDiscription: {
    type: String,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  sprint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sprint',
  },

  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
  },
});

groupSchema.plugin(MongooseDelete, { overrideMethods: 'all' });
const GroupModel = mongoose.model('Group', groupSchema);
export default GroupModel;
