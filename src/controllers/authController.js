import { mongo } from 'mongoose';
import userModel from '../models/user.js';
import { comparePassword, hashPassword } from '../services/encryptionService.js';
import { generateToken } from './../services/jwtService.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email: email });
    if (user && (await comparePassword(password, user.password))) {
      await user.updateOne({ lastLoggedIn: Date.now() });
      const payload = { id: user._id, role: user.role };
      const token = generateToken(payload);
      res.send({ status: 'success', data: { token: token } });
    } else {
      res.send({ status: 'error', message: 'Wrong email or password' });
    }
  } catch (err) {
    res.status(500).send({ status: 'error', message: err });
  }
};

export const register = async (req, res) => {
  const data = req.body;
  const hash = await hashPassword(data.password);
  data.password = hash;
  data._id = new mongo.ObjectId();
  data.role = 'user';
  const newUser = new userModel(data);

  try {
    await newUser.save();
    res.send({
      status: 'success',
      message: 'Successfully added new user',
      data: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: 'error', message: err });
  }
};
