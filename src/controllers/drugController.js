import uuid from "uuid";
import DrugModel from '../models/drug.js';
import CategoryModel from '../models/category.js';
import mongoose from 'mongoose';

export const addDrug = async (req, res) => {
  const data = req.body;
  data._id = new mongoose.Types.ObjectId();
  console.log(data);
  const categories = req.body?.categories?.split(',');

  try {
    if (categories) {
      categories.forEach(async (category) => {
        await CategoryModel.findOne({ _id: category });
      });
    }
    data.categories = categories;
    const newDrug = new DrugModel(data);
    await newDrug.save();
    res.send({
      status: 'success',
      message: 'Successfully added new drug',
      data: newDrug,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 'error', message: err });
  }
};

export const getAllDrugs = async (req, res) => {
  try {
    const drugs = await DrugModel.find({});
    res.send({ status: 'success', data: drugs });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};

export const getDrugById = async (req, res) => {
  const id = req.params.id;
  try {
    const drug = await DrugModel.findOne({ _id: id });
    res.send({ status: 'success', data: drug });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};

export const editDrug = async (req, res) => {
  const id = req.params.id;
  try {
    const drug = await DrugModel.findOne({ _id: id });
    res.send({ status: 'success', data: drug });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};

export const assignCategory = async (req, res) => {
  const id = req.params.id;
  const categories = req.body.categories;

  try {
    const drug = await DrugModel.findOne({ _id: id });

    res.send({ status: 'success', data: drug });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};