import express from 'express';
import { ensureGuest } from '../middleware/authMiddleware.js';
import { userData } from '../data/index.js';
import xss from 'xss';

const router = express.Router();

router.get('/', ensureGuest, (req, res) => {
  res.render('signinuser');
});

router.post('/', async (req, res) => {
  try {
    const userId = xss(req.body.userId);
    const password = xss(req.body.password);
    const authUser = await userData.signInUser(userId, password);
    req.session.user = authUser;
    res.redirect('/home');
  } catch (error) {
    res.status(400).render('signinuser', { error: error.message });
  }
});

export default router;
