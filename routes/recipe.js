import { Router } from 'express';
import { recipeData } from '../data/index.js';
import { reviewData } from '../data/index.js';
import helperFunctions from '../helpers.js';
const router = Router();

router.get('/:recipeId', async(req, res) => {
    let recipeId = req.params.recipeId;
    try {
        recipeId = helperFunctions.checkId(recipeId);
    } catch(e) {
        return res.status(400).redirect(`/home`, {error: e})
    }
    try {
        const recipe = await recipeData.getRecipeById(recipeId);
        const reviews = await reviewData.getAllRecipeReviews(recipeId);
        res.render('recipe', { recipe: recipe, reviews: reviews });
    } catch(e) {
        return res.status(404).redirect(`/home`, {error: e})
    }
    
});

router.post('/:recipeId/review', async(req, res) => {
    const { reviewText, rating } = req.body;
    let user = req.session.user;
    let recipeId = req.params.recipeId;
    if (!reviewText || !rating) {
        return res
          .status(400)
          .redirect(`/recipe/${recipeId}`, {error: 'There are missing fields in the request body'})
      }
    try {
        recipeId = helperFunctions.checkId(recipeId);
        user.id = helperFunctions.checkId(user.id);
        helperFunctions.checkText(reviewText);
        helperFunctions.checkRating(rating);
    } catch(e) {
        return res.status(400).redirect(`/recipe/${recipeId}`, {error: e})
    }
    try {
        const review = await reviewData.addReview(recipeId, user.id, user.userId, reviewText, rating);
        res.redirect(`/recipe/${recipeId}`)
    } catch(e) {
        return res.status(500).redirect(`/recipe/${recipeId}`, {error: e})
    }
});

router.post('/:recipeId/review/:reviewId/comment', async(req, res) => {
    const comment = req.body;
    const recipeId = req.params.recipeId;
    let reviewId = req.params.reviewId;
    try {
        reviewId = helperFunctions.checkId(reviewId);
        helperFunctions.checkText(comment);
    } catch(e) {
        return res.status(400).redirect(`/recipe/${recipeId}`, {error: e})
    }
    try {
        const review = await reviewData.addReviewComment(comment, reviewId);
        res.redirect(`/recipe/${recipeId}`)
    } catch(e) {
        return res.status(500).redirect(`/recipe/${recipeId}`, {error: e})
    }
});

export default router;