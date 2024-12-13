import express from 'express';
import { ensureGuest } from '../middleware/authMiddleware.js';
import { userData } from '../data/index.js';

const router = express.Router();

router.get('/', ensureGuest, (req, res) => {
  res.render('signinuser');
});

router.post('/', async (req, res) => {
  try {
    const { userId, password } = req.body;
    const authUser = await userData.signInUser(userId, password);
    req.session.user = authUser;
    res.redirect('/home');
  } catch (error) {
    res.status(400).render('login', { error: error.message });
  }
});

export default router;
