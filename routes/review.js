import { Router } from 'express';
import { reviewData } from '../data/index.js';
import helperFunctions from '../helpers.js';
import xss from 'xss';

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

router.post('/:recipeId/review', async (req, res) => {
    try {
        const reviewText = xss(req.body.reviewText);
        const rating = xss(req.body.rating);
        const user = req.session.user;
        const recipeId = req.params.recipeId;

        if (!reviewText || !rating) {
            throw new Error('Review text and rating are required.');
        }

        if(reviewText.trim().length < 5) {
            throw new Error('Review text must be longer');
        }

        const parsedRating = parseInt(rating, 10);
        if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 10) {
            throw new Error('Rating must be between 1-10.');
        }

        await reviewData.addReview(recipeId, user.id, user.userId, reviewText, parsedRating);
        res.redirect(`/recipe/${recipeId}`);
    } catch (error) {
        console.error(`Error adding review: ${error.message}`);
        res.status(400).render('error', { error: error.message });
    }
});


export default router;
