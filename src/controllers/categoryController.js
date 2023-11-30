import uuid from 'uuid';
import CategoryModel from '../models/category.js';
import mongoose from 'mongoose';

export const addCategory = async (req, res) => {
  const data = req.body;
  data._id = new mongoose.Types.ObjectId();
  console.log(data);
  const newCategory = new CategoryModel(data);

  try {
    await newCategory.save();
    res.send({
      status: 'success',
      message: 'Successfully added new category',
      data: newCategory,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 'error', message: err });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    res.send({ status: 'success', data: categories });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};

export const getCategoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await CategoryModel.findOne({ _id: id });
    res.send({ status: 'success', data: category });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};

export const editCategory = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const category = await CategoryModel.findOne({ _id: id });
    await category.updateOne(data);
    res.send({ status: 'success', data: category });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};
