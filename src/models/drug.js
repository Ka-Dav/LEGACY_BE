import mongoose, { Schema } from 'mongoose';
import Category from './category.js';

const drugSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  formula: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  usage: {
    type: String,
    required: true,
  },
});

const drugModel = mongoose.model('Drug', drugSchema);

export default drugModel;
