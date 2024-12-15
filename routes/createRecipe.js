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
        const user = req.session.user;
        console.log("userid is " + user.id);
        const { recipeName, ingredientName, ingredientAmount, instructions, cuisine } = req.body;


        if (!recipeName || typeof recipeName !== 'string' || recipeName.trim().length === 0) {
            throw new Error('Recipe name is required.');
        }

        if (!Array.isArray(ingredientName) || !Array.isArray(ingredientAmount) || ingredientName.length !== ingredientAmount.length) {
            throw new Error('Ingredients and their amounts must be provided.');
        }

        const ingredients = {};
        ingredientName.forEach((name, index) => {
            if (!name.trim() || !ingredientAmount[index].trim()) {
                throw new Error('Each ingredient and its amount must be non-empty.');
            }
            ingredients[name.trim()] = ingredientAmount[index].trim();
        });

        if (!Array.isArray(instructions) || instructions.some((step) => typeof step !== 'string' || step.trim().length === 0)) {
            throw new Error('Instructions must be a non-empty array of strings.');
        }

        if (!cuisine || typeof cuisine !== 'string' || cuisine.trim().length === 0) {
            throw new Error('cuisines is required.');
        }


        const newRecipe = await recipeData.addRecipe(
            recipeName.trim(),
            ingredients,
            instructions.map((step) => step.trim()),
            cuisine.trim(),
            user.id
        );

        res.redirect(`/recipe/${newRecipe._id}`);
    } catch (error) {
        res.status(400).render('createRecipe', { error: error.message });
    }
});



export default router;
