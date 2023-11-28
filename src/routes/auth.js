import express from 'express';
import {
  userValidation,
  authValidation,
} from '../middleware/dataValidation.js';
import { login, register } from '../controllers/authController.js';

const router = express.Router();

router.post('/login',authValidation, login);

router.post('/register', userValidation, register);

export default router;