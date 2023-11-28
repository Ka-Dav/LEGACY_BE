import mongoose, { Schema } from 'mongoose';

const categorySchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

});

const userModel = mongoose.model('Category', categorySchema);

export default userModel;
