import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const SprintSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
});

SprintSchema.plugin(MongooseDelete, { overrideMethods: 'all' });
const SprintModel = mongoose.model('Sprint', SprintSchema);
export default SprintModel;
