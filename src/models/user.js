import mongoose, { Schema } from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  gender:{
    type: String,
    enum:['male','female'],
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  lastLoggedIn: {
    type: Date,
  },
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
