import express from 'express';
import * as userController from '../controllers/userController.js';
import {
  adminCheck,
  authCheck,
  userCheck,
} from './../middleware/authChecker.js';

const router = express.Router();

router.get('/all', authCheck, adminCheck, userController.getAllUsers);

router.get('/:id', authCheck, adminCheck, userController.getUserById);

router.get('/', authCheck, userController.getUser);

export default router;
