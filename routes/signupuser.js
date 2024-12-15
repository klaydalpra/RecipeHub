import express from 'express';
import { signUpUser } from '../data/users.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('signupuser');
});

router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, userId, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).render('signupuser', { 
                error: 'Passwords do not match.' 
            });
        }

        await signUpUser(firstName, lastName, email, userId, password);

        res.redirect('/signinuser');
    } catch (error) {
        res.status(400).render('signupuser', { error: error.message });
    }
});

export default router;
