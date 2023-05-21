/** @format */
import mongoose from 'mongoose';
import MongooseDelete from 'mongoose-delete';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      enum: ['User', 'Admin'],
      default: 'User',
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
    },
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
      },
    ],
    otp: { type: Number },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    // eslint-disable-next-line comma-dangle
  }
);

UserSchema.plugin(MongooseDelete, { overrideMethods: 'all' });
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
