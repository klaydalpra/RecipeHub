import {MongoClient, ObjectId} from 'mongodb';
import { recipesCollection } from '../config/mongoCollections.js';
import { reviewsCollection } from '../config/mongoCollections.js';
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
   const addRecipe = async (name, ingredients, instructions, cuisine, authorId) => {
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        throw new Error('Recipe name is required.');
    }

    if (typeof ingredients !== 'object' || Array.isArray(ingredients) || Object.keys(ingredients).length === 0) {
        throw new Error('Ingredients must be a non-empty object.');
    }

    if (!Array.isArray(instructions) || instructions.length === 0 || instructions.some((step) => typeof step !== 'string')) {
        throw new Error('Instructions must be a non-empty array of strings.');
    }
    if (!cuisine || typeof cuisine !== 'string' || cuisine.trim().length === 0) {
        throw new Error('Cuisine is required.');
    }


    const postedDate = new Date().toISOString();

 

    const newRecipe = {
        name: name.trim(),
        ingredients,
        instructions,
        cuisine: cuisine.trim(),
        postedDate,
        reviewIds: [],
        savedByUserIds: [],
        author: authorId
    };

    console.log(newRecipe.postedDate);

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
        const recipesCol = await recipesCollection();
        const reviewsCol = await reviewsCollection();

        const recipes = await recipesCol.find({}).toArray();
        const reviews = await reviewsCol.find({}).toArray();

        if (!recipes || recipes.length === 0) {
            return [];
        }
        const recipeReviews = {};
        reviews.forEach(review => {
            const recipeId = review.recipeId.toString();
            const rating = typeof review.rating === 'string' ? parseFloat(review.rating) : review.rating;

            if (!recipeReviews[recipeId]) {
                recipeReviews[recipeId] = [];
            }
            recipeReviews[recipeId].push(rating);
        });

        const recipesWithAverageRating = recipes
            .map(recipe => {
                const recipeId = recipe._id.toString();
                const recipeRating = recipeReviews[recipeId];

                if (recipeRating && recipeRating.length > 0) {
                    const formattedDate = new Date(recipe.postedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });
                    const totalRating = recipeRating.reduce((sum, rating) => sum + rating, 0);
                    const averageRating = totalRating / recipeRating.length;
                    return {
                        _id: recipe._id.toString(),
                        name: recipe.name,
                        cuisine: recipe.cuisine || 'Unknown',
                        averageRating: averageRating.toFixed(2),
                        postedDate: formattedDate
                    };
                }

                return null;
            })
            .filter(recipe => recipe !== null);


        recipesWithAverageRating.sort((a, b) => b.averageRating - a.averageRating);

        const topRatedRecipes = recipesWithAverageRating.slice(0, 3);

        if (topRatedRecipes.length < 3) {
            const newRecipes = recipes
                .filter(recipe => !topRatedRecipes.some(topRecipe => topRecipe._id === recipe._id.toString()))
                .sort((a, b) => (b.savedByUserIds?.length || 0) - (a.savedByUserIds?.length || 0));

            while (topRatedRecipes.length < 3 && newRecipes.length > 0) {
                const nextRecipe = newRecipes.shift();
                topRatedRecipes.push({
                    _id: nextRecipe._id.toString(),
                    name: nextRecipe.name,
                    cuisine: nextRecipe.cuisine || 'Unknown',
                    averageRating: 'N/A',
                    postedDate: nextRecipe.postedDate
                });
            }
        }
        return topRatedRecipes;
    } catch (error) {
        console.error('Error in getTopRatedRecipes:', error);
        return [];
    }
};


const getRecipesByUserId = async (userId, limit = 2) => {
    userId = helperFunctions.checkId(userId);
    console.log("following : " + userId);

    const recipesCol = await recipesCollection();
    const recipes = await recipesCol
        .find({ author: userId })
        .sort({ postedDate: -1 })
        .limit(limit)
        .toArray();

    return recipes.map(recipe => ({
        _id: recipe._id.toString(),
        name: recipe.name,
        author: recipe.author,
    }));
};

const getRecipesByIds = async (recipeIds) => {
    if (!Array.isArray(recipeIds)) throw new Error('Invalid recipe IDs array.');

    const recipesCol = await recipesCollection();
    const objectIdArray = recipeIds.map(id => new ObjectId(id));
    const recipes = await recipesCol.find({ _id: { $in: objectIdArray } }).toArray();

    return recipes;
};

export { addRecipe, getAllRecipes, getRecipeById, recipeSaved, getTopRatedRecipes,getRecipesByUserId, getRecipesByIds };