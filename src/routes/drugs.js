import express from 'express';
import {drugValidation} from '../middleware/dataValidation.js'
import * as drugController from "../controllers/drugController.js"
import { multerUploads } from '../services/multerService.js';
import imageUploader from './../middleware/imageUploader.js';
const router = express.Router();

router.post('/',multerUploads,imageUploader,drugValidation,drugController.addDrug);

router.get('/', drugController.getAllDrugs);

router.get('/:id', drugController.getDrugById);

router.patch('/:id', drugValidation, drugController.editDrug);

export default router;