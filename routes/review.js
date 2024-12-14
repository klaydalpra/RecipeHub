import { Router } from 'express';
import { reviewData } from '../data/index.js';
import helperFunctions from '../helpers.js';

const router = Router();

router.get('/:reviewId', async (req, res) => {
    try {
        const reviewId = helperFunctions.checkId(req.params.reviewId);
        const review = await reviewData.getReviewById(reviewId);

        if (!review || !review.recipeId) {
            return res.status(404).render('error', { error: 'Review or associated recipe not found.' });
        }

        res.redirect(`/recipe/${review.recipeId}`);
    } catch (error) {
        console.error(`Error fetching review: ${error.message}`);
        res.status(400).render('error', { error: 'Invalid review ID.' });
    }
});

export default router;
