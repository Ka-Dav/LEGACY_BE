import express from 'express';
import auth from './auth.js';
import drugs from './drugs.js'


const router = express.Router();

router.use('/auth', auth);
router.use('/drugs', drugs);

router.use('*', (req, res) => {
  res.send('404! This is an invalid URL.');
});

export default router;