import express from 'express';
import { signUpUser } from '../data/users.js';
import xss from 'xss';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('signupuser');
});

router.post('/', async (req, res) => {
    try {
        const firstName = xss(req.body.firstName);
        const lastName = xss(req.body.lastName);
        const email = xss(req.body.email);
        const userId = xss(req.body.userId);
        const password = xss(req.body.password);
        const confirmPassword = xss(req.body.confirmPassword);

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
