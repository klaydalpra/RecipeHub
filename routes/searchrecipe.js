import {Router} from 'express';
const router = Router();
import {getAllRecipes} from '../data/recipes.js';

router.post('/', async (req, res) => {
    const searchQuery1 = req.body.searchQuery?.trim();
    const searchQuery = sanitizeSearchText(searchQuery1);
    const filter = req.body.filter || 'all';

    // Fetch all recipes
    const recipes = await getAllRecipes();

    // Filter recipes based on the selected filter
    let filteredRecipes = recipes;

    if (searchQuery) {
        switch (filter) {
            case 'cuisine':
                filteredRecipes = recipes.filter(recipe =>
                    recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
                );
                break;
            case 'dietary':
                filteredRecipes = recipes.filter(recipe =>
                    recipe.dietaryPreferences.some(preference =>
                        preference.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                );
                break;
            case 'ingredients':
                filteredRecipes = recipes.filter(recipe =>
                    recipe.ingredients.some(ingredient =>
                        ingredient.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                );
                break;
            case 'all':
            default:
                filteredRecipes = recipes.filter(recipe =>
                    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
                );
                break;
        }
    }
    // Render search results page with filter options
    res.render('searchResults', {
        title: `Search Results for "${searchQuery}"`,
        filter,
        recipes: filteredRecipes
    });
});

function sanitizeSearchText(text) {
    if (!text) return '';

    const cleanedText = text.replace(/[^a-zA-Z\s]/g, '');
    return cleanedText.slice(0, 500).trim();
};
// Function to filter recipes by name (title)
function filterByName(recipes, name) {
    return recipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase())
    );
}

// Function to filter recipes by cuisine
const filterByCuisine = (recipes, cuisine) => {
    return recipes.filter(recipe =>
        recipe.cuisine.toLowerCase() === cuisine.toLowerCase()
    );
};

// Function to filter recipes by dietary preference
const filterByDietary = (recipes, dietary) => {
    return recipes.filter(recipe =>
        recipe.dietary.toLowerCase() === dietary.toLowerCase()
    );
};

// Function to filter recipes by ingredients (comma-separated)
const filterByIngredients = (recipes, ingredients) => {
    const ingredientArray = ingredients.toLowerCase().split(',').map(i => i.trim());
    return recipes.filter(recipe =>
        ingredientArray.every(ing =>
            recipe.ingredients.some(ri => ri.toLowerCase().includes(ing))
        )
    );
};

// Combined filtering function
const filterRecipes = (recipes, {searchByTitle, cuisine, dietary, ingredients }) => {
    let filteredRecipes = recipes;

    if (searchByTitle) {
        filteredRecipes = filterByName(filteredRecipes, searchByName);
    }

    if (cuisine) {
        filteredRecipes = filterByCuisine(filteredRecipes, cuisine);
    }

    if (dietary) {
        filteredRecipes = filterByDietary(filteredRecipes, dietary);
    }

    if (ingredients) {
        filteredRecipes = filterByIngredients(filteredRecipes, ingredients);
    }

    return filteredRecipes;
};

export default router;
