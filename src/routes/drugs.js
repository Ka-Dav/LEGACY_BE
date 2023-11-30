import express from 'express';
import {drugValidation} from '../middleware/dataValidation.js'
import * as drugController from "../controllers/drugController.js"
import { multerUploads } from '../services/multerService.js';
import imageUploader from './../middleware/imageUploader.js';
import { adminCheck, authCheck } from './../middleware/authChecker.js';

const router = express.Router();

router.post(
  '/',
  authCheck,
  adminCheck,
  imageUploader,
  drugValidation,
  drugController.addDrug
);

router.get('/', drugController.getAllDrugs);

router.get('/:id', drugController.getDrugById);

router.post(
  '/:id/assignCategory',
  authCheck,
  adminCheck,
  drugController.assignCategory
);

router.patch(
  '/:id',
  authCheck,
  adminCheck,
  drugValidation,
  drugController.editDrug
);

export default router;