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
  const { user, date } = req.query;
  try {
    if (user) {
      const purchases = await PurchaseModel.find({user:user}).populate(['user', 'drug']);
      res.send({ status: 'success', data: purchases });
    } 
    else if (date) {
      const purchases = await PurchaseModel.find({ date:date }).populate([
        'user',
        'drug',
        ]);
        res.send({ status: 'success', data: purchases });
    }else {
      const purchases = await PurchaseModel.find({}).populate(['user', 'drug']);
      res.send({ status: 'success', data: purchases });
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
