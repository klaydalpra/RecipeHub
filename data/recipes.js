import {MongoClient, ObjectId} from 'mongodb';
import { recipesCollection } from '../config/mongoCollections.js';
import {closeConnection} from '../config/mongoConnections.js';
import helperFunctions from '../helpers.js';

/*
const addRecipe = async (name, ingredients, instructions, dateMade) => {

    const recipesCol = await recipesCollection();

    const newRecipe = {
        name,
        ingredients,
        instructions,
        dateMade,
        reviewIds: [],
        savedByUserIds: []
    };

    const insertInfo = await recipesCol.insertOne(newRecipe);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add recipe';

    const recipeId = insertInfo.insertedId;
    return { _id: recipeId, ...newRecipe };
}
    */
   const addRecipe = async (name, ingredients, instructions) => {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        throw new Error('Recipe name is required.');
    }

    if (typeof ingredients !== 'object' || Array.isArray(ingredients) || Object.keys(ingredients).length === 0) {
        throw new Error('Ingredients must be a non-empty object.');
    }

    if (!Array.isArray(instructions) || instructions.length === 0 || instructions.some((step) => typeof step !== 'string')) {
        throw new Error('Instructions must be a non-empty array of strings.');
    }

    const newRecipe = {
        name: name.trim(),
        ingredients,
        instructions,
        reviewIds: [],
        savedByUserIds: [],
    };

    const recipesCol = await recipesCollection();
    const insertResult = await recipesCol.insertOne(newRecipe);

    if (!insertResult.acknowledged || !insertResult.insertedId) {
        throw new Error('Failed to add the recipe.');
    }

    return { _id: insertResult.insertedId, ...newRecipe };
};


const getAllRecipes = async () => {
    const recipesCol = await recipesCollection();
    const recipes = await recipesCol.find({}).toArray();
    return recipes;
}

const getRecipeById = async (id) => {
    helperFunctions.checkId(id);
    const recipesCol = await recipesCollection();
    const recipe = await recipesCol.findOne({_id: new ObjectId(id)});
    if (recipe === null) throw new Error (`Could not find recipe with id of ${id}`);

    recipe._id = recipe._id.toString();
  
    return recipe;
}

const recipeSaved = async (recipeId, userId) => {
    helperFunctions.checkId(recipeId);
    helperFunctions.checkId(userId);
    const recipesCol = await recipesCollection();
    const recipe = await recipesCol.findOne({_id: new ObjectId(recipeId)});
    let currentSavedByUserIds = Array.isArray(recipe.savedByUserIds) ? recipe.savedByUserIds : [];
    if (currentSavedByUserIds.includes(userId)) throw new Error('This recipe has already been saved');
    currentSavedByUserIds.push(userId)
    const newSavedByUserIds = {
        savedByUserIds: currentSavedByUserIds
    }
    const updatedRecipe = await recipesCol.updateOne(
        {_id: new ObjectId(recipeId)},
        {$set: newSavedByUserIds},
        {returnDocument: 'after'}
    );

    if (!updatedRecipe) throw new Error(`Could not save recipe ${recipeId} for user ${userId}`);

    return updatedRecipe;
}

const getTopRatedRecipes = async () => {
    try {
        const recipes = await getAllRecipes();
        const reviews = await getAllRecipeReviews();

        if (!recipes || recipes.length === 0) {
            return [];
        }

        const recipeReviews = {};
        reviews.forEach(review => {
            if (!recipeReviews[review.recipeId]) {
                recipeReviews[review.recipeId] = [];
            }
            recipeReviews[review.recipeId].push(review.rating);
        });

        const recipesWithAverageRating = recipes
            .map(recipe => {
                const recipeRating = recipeReviews[recipe.id];

                if (recipeRating && recipeRating.length > 0) {
                    const averageRating =
                        recipeRating.reduce((sum, rating) => sum + rating, 0) / recipeRating.length;
                    return {
                        id: recipe.id,
                        name: recipe.name,
                        cuisine: recipe.cuisine,
                        averageRating: averageRating.toFixed(2) // Format to 2 decimal places
                    };
                }

                return null;
            })
            .filter(recipe => recipe !== null);
           
        recipesWithAverageRating.sort((a, b) => b.averageRating - a.averageRating);

        const topRatedRecipes = recipesWithAverageRating.slice(0, 3);

        if (topRatedRecipes.length < 3) {
            const newRecipes = recipes
                .filter(recipe => !topRatedRecipes.some(topRecipe => topRecipe.id === recipe.id))
                .sort((a, b) => b.savedByUserIds.length - a.savedByUserIds.length);

            while (topRatedRecipes.length < 3 && newRecipes.length > 0) {
                const nextRecipe = newRecipes.shift();
                topRatedRecipes.push({
                    id: nextRecipe.id,
                    name: nextRecipe.name,
                    cuisine: nextRecipe.cuisine,
                    averageRating: 'N/A'
                });
            }
        }

        return topRatedRecipes;
    } catch {
        return [];
    }
};


export { addRecipe, getAllRecipes, getRecipeById, recipeSaved, getTopRatedRecipes };
