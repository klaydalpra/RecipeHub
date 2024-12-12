import { Router } from 'express';
import { ensureAuthenticated } from '../middleware/authMiddleware.js';
import { recipeData } from '../data/index.js';

const router = Router();


router.use(ensureAuthenticated);


router.get('/', (req, res) => {
    res.render('createRecipe');
});
router.post('/', async (req, res) => {
    try {
        const { recipeName, ingredientName, ingredientAmount, instructions } = req.body;

        // Validate recipeName
        if (!recipeName || typeof recipeName !== 'string' || recipeName.trim().length === 0) {
            throw new Error('Recipe name is required.');
        }

        // Validate ingredients
        if (!Array.isArray(ingredientName) || !Array.isArray(ingredientAmount) || ingredientName.length !== ingredientAmount.length) {
            throw new Error('Ingredients and their amounts must be provided.');
        }

        // Construct the ingredients object
        const ingredients = {};
        ingredientName.forEach((name, index) => {
            if (!name.trim() || !ingredientAmount[index].trim()) {
                throw new Error('Each ingredient and its amount must be non-empty.');
            }
            ingredients[name.trim()] = ingredientAmount[index].trim();
        });

        // Validate instructions
        if (!Array.isArray(instructions) || instructions.some((step) => typeof step !== 'string' || step.trim().length === 0)) {
            throw new Error('Instructions must be a non-empty array of strings.');
        }

        // Add recipe to the database
        const newRecipe = await recipeData.addRecipe(recipeName.trim(), ingredients, instructions.map((step) => step.trim()));

        // Redirect to the recipe details page
        res.redirect(`/recipe/${newRecipe._id}`);
    } catch (error) {
        res.status(400).render('createRecipe', { error: error.message });
    }
});



export default router;
