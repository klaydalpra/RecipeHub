import express from 'express';
import { ensureGuest } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', ensureGuest, (req, res) => {
  res.render('signinuser');
});

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    req.session.user = { username };
    res.redirect('/home');
  } catch (error) {
    res.status(400).render('login', { error: error.message });
  }
});

export default router;
