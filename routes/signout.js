import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).render('error', { error: 'Failed to sign out. Please try again.' });
      }
      res.clearCookie('AuthCookie');
      const user = null;
      res.render('signoutuser', { message: 'You have been logged out.', user });
    });
  } else {
    res.redirect('/login');
  }
});

export default router;
