import uuid from 'uuid';
import userModel from '../models/user.js';
import mongoose from 'mongoose';

export const getAllUsers = async (req, res) => {
  const { gen, befo, afte } = req.query;
  try {
    if (gen) {
      const users = await userModel.find({ gender: gen });
      res.send({ status: 'success', data: users });
    } else if (befo) {
      const users = await userModel.find({ lastLoggedIn: { $lte: befo } });
      res.send({ status: 'success', data: users });
    } else if (afte) {
      const users = await userModel.find({ lastLoggedIn: { $gte: afte } });
      res.send({ status: 'success', data: users });
    } else {
      const users = await userModel.find({});
      res.send({ status: 'success', data: users });
    }
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};

export const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.findOne({ _id: id });
    res.send({ status: 'success', data: user });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};

export const editUser = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const categories = req.body?.categories?.split(',');
  if (categories) {
    data.categories = categories;
  }

  try {
    const drug = await userModel.findOne({ _id: id });
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
    const drug = await userModel.findOne({ _id: id });
    const categoriesUp = { categories: [...drug.categories, categories] };
    await drug.updateOne(categoriesUp);
    res.send({ status: 'success', data: drug });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};
