import { Router } from 'express';
import { getTrendingRecipes } from '../data/recipes.js';
const router = Router();

router.get('/', async (req, res) => {
    //res.send('Hello, World! This is the homepage!');
  try {
        const topRatedRecipes = await getTopRatedRecipes();
        res.render('home', { 
            title: 'RecipeHub',
            topRatedRecipes: topRatedRecipes || []
        });
    } catch (error) {
        console.error('Error loading homepage:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
