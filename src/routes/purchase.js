import express from 'express';
import { drugValidation } from '../middleware/dataValidation.js';
import * as userController from '../controllers/userController.js';
import { adminCheck, authCheck } from './../middleware/authChecker.js';

const router = express.Router();

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

export default router;
