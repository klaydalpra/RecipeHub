import { Router } from 'express';
import { getTopRatedRecipes } from '../data/recipes.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const topRatedRecipes = await getTopRatedRecipes();
        res.render('home', { 
            title: 'RecipeHub',
            topRatedRecipes: topRatedRecipes || [] // Pass the formatted recipes to the template
        });
    } catch (error) {
        console.error('Error loading homepage:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
