import mongoose, { Schema } from 'mongoose';
import User from './user';

const userSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  user: { type: mongoose.SchemaTypes.ObjectId, ref: User },
  role: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
