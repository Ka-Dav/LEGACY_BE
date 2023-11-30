import express from 'express';
import * as purchaseController from '../controllers/purchaseController.js';
import {
  adminCheck,
  authCheck,
  userCheck,
} from './../middleware/authChecker.js';

const router = express.Router();

router.post('/', authCheck, userCheck, purchaseController.addPurchase);

router.get('/all', authCheck, adminCheck, purchaseController.getAllPurchases);

router.get('/', authCheck, userCheck, purchaseController.getPurchases);

export default router;
