import { Router } from 'express';
const router = Router();
import {recipeData} from '../data/index.js';

router.get('/', (req, res) => {
    res.send('Hello, World! This is the create a recipe page!');
});

router.post('/', async(req, res) => {
    const { recipeName, ingredients, instructions } = req.body;

    if (!recipeName || !Array.isArray(ingredients) || !Array.isArray(instructions)) {
        return res.status(400).json({ error: 'Invalid input: recipeName, ingredients, and instructions are required.' });
    }

    const newRecipe = await recipeData.addRecipe(recipeName, ingredients, instructions);

    res.status(201).json({ message: 'Recipe created successfully!', recipe: newRecipe });
});

export default router;