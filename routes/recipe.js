import { Router } from 'express';
import { recipeData } from '../data/index.js';
import { reviewData } from '../data/index.js';
import { userData } from '../data/index.js';
import helperFunctions from '../helpers.js';
import { ensureAuthenticated } from '../middleware/authMiddleware.js';
const router = Router();

router.get('/:recipeId', async (req, res) => {
    let recipeId = req.params.recipeId;
    const user = req.session.user;
    try {
        recipeId = helperFunctions.checkId(recipeId);
    } catch (e) {
        return res.status(400).redirect('/home');
    }

    try {
        const recipe = await recipeData.getRecipeById(recipeId);
        const reviews = await reviewData.getAllRecipeReviews(recipeId);
        const author = await userData.getUserById2(recipe.author);

        const formattedDate = new Date(recipe.postedDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        

        res.render('recipe', { recipe, reviews, user,formattedDate, author });
    } catch (e) {
        console.error(`Error fetching recipe or reviews: ${e.message}`);
        return res.status(404).render('error.handlebars', {message: e});
    }
});

router.post('/:recipeId/save', ensureAuthenticated, async (req, res) => {
    const user = req.session.user;
    let recipeId = req.params.recipeId;

    if (!user) {
        return res.status(403).render('error.handlebars', {message: "Must be logged in to save recipes", recipeId})
    }

    try {
        recipeId = helperFunctions.checkId(recipeId);
        user.id = helperFunctions.checkId(user.id);
    } catch (e) {
        return res.status(400).render('error.handlebars', {message: e, recipeId});
    }

    try {
        await userData.saveRecipe(recipeId, user.id);
        return res.redirect(`/recipe/${recipeId}`);
    } catch (e) {
        return res.status(500).render('error.handlebars', {message: e, recipeId});
    }
});

router.post('/:recipeId/review',ensureAuthenticated, async (req, res) => {
    const { reviewText, rating } = req.body;
    const user = req.session.user;
    let recipeId = req.params.recipeId;

    try {
        recipeId = helperFunctions.checkId(recipeId);
        user.id = helperFunctions.checkId(user.id);
        helperFunctions.checkText(reviewText);
        helperFunctions.checkRating(rating);
    } catch (e) {
        return res.status(400).render('error.handlebars', {message: e});
    }

    try {
        await reviewData.addReview(recipeId, user.id, user.userId, reviewText, rating);
        return res.redirect(`/recipe/${recipeId}`);
    } catch (e) {
        return res.status(500).render('error.handlebars', {message: e});
    }
});

router.post('/:recipeId/review/:reviewId/comment', async(req, res) => {
    let comment = req.body.commentText;
    const user = req.session.user;
    let recipeId = req.params.recipeId;
    let reviewId = req.params.reviewId;
    try {
        reviewId = helperFunctions.checkId(reviewId);
        recipeId = helperFunctions.checkId(recipeId);
        helperFunctions.checkText(comment);
    } catch(e) {
        return res.status(400).render('error.handlebars', {message: e});
    }
    try {
        const reviewComment = await reviewData.addReviewComment(comment, reviewId, user.userId);
        res.redirect(`/recipe/${recipeId}`)
    } catch(e) {
        return res.status(500).render('error.handlebars', {message: e});
    }
});

export default router;