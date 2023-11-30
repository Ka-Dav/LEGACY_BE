import mongoose from 'mongoose';
import DrugModel from '../models/drug.js';
import PurchaseModel from '../models/purchase.js';

export const addPurchase = async (req, res) => {
  const data = req.body;
  data._id = new mongoose.Types.ObjectId();

  try {
    const newPurchase = new PurchaseModel(data);
    await newPurchase.save();
    res.send({
      status: 'success',
      message: 'Successfully added new purchase',
      data: newDrug,
    });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};

export const getAllPurchases = async (req, res) => {
  const { user } = req.query;
  try {
    if (user) {
      const drugs = await PurchaseModel.find({ categories: cat }).populate(
        'categories'
      );
      res.send({ status: 'success', data: drugs });
    } else {
      const drugs = await PurchaseModel.find({}).populate('categories');
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
