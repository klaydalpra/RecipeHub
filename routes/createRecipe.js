import { Router } from 'express';
import { ensureAuthenticated } from '../middleware/authMiddleware.js';
import { recipeData } from '../data/index.js';

const router = Router();


router.use(ensureAuthenticated);


router.get('/', (req, res) => {
    res.send('Hello, World! This is the create a recipe page!');
});

router.post('/', async (req, res) => {
    try{
        const { recipeName, ingredients, instructions } = req.body;
        
        if(!recipeName || !Array.isArray(ingredients) || !Array.isArray(instructions)) {
            return res.status(400).json({ error: 'Invalid input: recipeName, ingredients, and instructions are required.' });
        }

        const newRecipe = await recipeData.addRecipe(recipeName, ingredients, instructions);
        res.status(201).json({ message: 'Recipe created successfully!', recipe: newRecipe });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
