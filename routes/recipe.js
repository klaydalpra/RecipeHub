import { Router } from 'express';
import { recipeData } from '../data/index.js';
const router = Router();

router.get('/:recipeId', async(req, res) => {
    const recipe = await recipeData.getRecipeById(req.params.recipeId);
    res.render('recipe', { recipe });
});

export default router;