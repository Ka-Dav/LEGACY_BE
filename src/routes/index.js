import express from 'express';
import auth from './auth.js';
import drugs from './drugs.js';
import category from './category.js';
import users from './users.js';

const router = express.Router();

router.use('/auth', auth);
router.use('/drugs', drugs);
router.use('/category', category);
router.use('/users', users);

router.use('*', (req, res) => {
  res.send('404! This is an invalid URL.');
});

export default router;