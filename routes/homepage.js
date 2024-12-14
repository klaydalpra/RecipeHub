import { Router } from 'express';
import { getTrendingRecipes } from '../data/recipes.js';
const router = Router();

router.get('/', async (req, res) => {
    //res.send('Hello, World! This is the homepage!');
    try {
        const trendingRecipes = await getTrendingRecipes();
        res.render('home', { title: 'RecipeHUB', trendingRecipes});
    } catch (error) {
        console.error('Error fetching trending recipes:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
