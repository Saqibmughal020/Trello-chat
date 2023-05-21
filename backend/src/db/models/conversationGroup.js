import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const conversationSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
});

conversationSchema.plugin(MongooseDelete, { overrideMethods: 'all' });
const ConversationModel = mongoose.model('Conversation', conversationSchema);
export default ConversationModel;
