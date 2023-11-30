import mongoose from 'mongoose';
import PurchaseModel from '../models/purchase.js';

export const addPurchase = async (req, res) => {
  const data = req.body;
  data.user = req.user.id;
  data._id = new mongoose.Types.ObjectId();

  try {
    const newPurchase = new PurchaseModel(data);
    await newPurchase.save();
    res.send({
      status: 'success',
      message: 'Successfully added new purchase',
      data: newPurchase,
    });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};

export const getAllPurchases = async (req, res) => {
  const { user, date, drug } = req.query;
  try {
    if (user) {
      const purchases = await PurchaseModel.find({ user: user })
        .populate(['user', 'drug'])
        .select({ drug: 1, user: 0 });
      res.send({ status: 'success', data: purchases });
    } else if (drug) {
      const purchases = await PurchaseModel.find({ drug: drug })
        .populate(['user', 'drug'])
        .select({ drug: 0, user: 1 });
      res.send({ status: 'success', data: purchases });
    } else if (date) {
      const purchases = await PurchaseModel.find({
        date: { $gte: date },
      })
        .populate(['user', 'drug'])
        .select({ drug: 0, user: 1 });
      res.send({ status: 'success', data: purchases });
    } else {
      const purchases = await PurchaseModel.find({}).populate(['user', 'drug']);
      res.send({ status: 'success', data: purchases });
    }
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};

export const getPurchases = async (req, res) => {
  const id = req.user.id;
  try {
    const purchase = await PurchaseModel.find({ _id: id }).populate([
      'user',
      'drug',
    ]);
    res.send({ status: 'success', data: purchase });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};
