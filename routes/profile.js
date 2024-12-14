import { Router } from 'express';
import { userData } from '../data/index.js';
import helperFunctions from '../helpers.js';
import { ensureAuthenticated } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.session.user.id;
        const user = await userData.getUserById(userId);

        res.render('profile', {
            user,
            isOwnProfile: true,
            title: `${user.firstName} ${user.lastName}'s Profile`,
        });
    } catch (error) {
        console.error(`Error loading profile: ${error.message}`);
        res.status(500).render('error', { error: 'Failed to load profile.' });
    }
});


router.get('/:userId', async (req, res) => {
    try {
        const userId = helperFunctions.checkId(req.params.userId);
        const user = await userData.getUserById(userId);

        res.render('profile', {
            user,
            isOwnProfile: false,
            title: `${user.firstName} ${user.lastName}'s Profile`,
        });
    } catch (error) {
        console.error(`Error loading profile: ${error.message}`);
        res.status(400).render('error', { error: 'Failed to load profile.' });
    }
});

export default router;
