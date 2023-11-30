import uuid from "uuid";
import DrugModel from '../models/drug.js';
import CategoryModel from '../models/category.js';
import mongoose from 'mongoose';

export const addDrug = async (req, res) => {
  const data = req.body;
  data._id = new mongoose.Types.ObjectId();
  const categories = req.body?.categories?.split(',');
  if (categories) {
    data.categories = categories;
  }
  try {
    const newDrug = new DrugModel(data);
    await newDrug.save();
    res.send({
      status: 'success',
      message: 'Successfully added new drug',
      data: newDrug,
    });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};

export const getAllDrugs = async (req, res) => {
  const { cat } = req.query;
  try {
    if (cat) {
      const drugs = await DrugModel.find({ categories: cat }).populate(
        'categories'
      );
      res.send({ status: 'success', data: drugs });
    } else {
      const drugs = await DrugModel.find({}).populate('categories');
      res.send({ status: 'success', data: drugs });
    }
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};

export const getDrugById = async (req, res) => {
  const id = req.params.id;
  try {
    const drug = await DrugModel.findOne({ _id: id }).populate('categories');
    res.send({ status: 'success', data: drug });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};

export const editDrug = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const categories = req.body?.categories?.split(',');
  if (categories) {
    data.categories = categories;
  }

  try {
    const drug = await DrugModel.findOne({ _id: id });
    if (drug) {
      await drug.updateOne(data);
      res.send({ status: 'success', data: drug });
    } else {
      res.status(500).send({ status: 'error', message: 'Drug not found' });
    }
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};

export const assignCategory = async (req, res) => {
  const id = req.params.id;
  const categories = req.body.categories;
  console.log(categories);

  try {
    const drug = await DrugModel.findOne({ _id: id });
    const categoriesUp = { categories: [...drug.categories, categories] };
    await drug.updateOne(categoriesUp);
    res.send({ status: 'success', data: drug });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};