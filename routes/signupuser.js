import express from 'express';
import { signUpUser } from '../data/users.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('signupuser');
});

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, userId, password, favoriteQuote, backgroundColor, fontColor, role } = req.body;
    const themePreference = {
      backgroundColor: backgroundColor.toLowerCase(),
      fontColor: fontColor.toLowerCase(),
    };

    await signUpUser(firstName, lastName, userId, password, favoriteQuote, themePreference, role);

    res.redirect('/login');
  } catch (error) {
    res.status(400).render('signupuser', { error: error.message });
  }
});

export default router;
