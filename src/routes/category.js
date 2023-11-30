import express from 'express';
import { categoryValidation } from '../middleware/dataValidation.js';
import * as categoryController from '../controllers/categoryController.js';
import { adminCheck, authCheck } from './../middleware/authChecker.js';

const router = express.Router();

router.post(
  '/',
  authCheck,
  adminCheck,
  categoryValidation,
  categoryController.addCategory
);

router.get('/', categoryController.getAllCategories);

router.get('/:id', categoryController.getCategoryById);

router.patch(
  '/:id',
  authCheck,
  adminCheck,
  categoryValidation,
  categoryController.editCategory
);

export default router;
