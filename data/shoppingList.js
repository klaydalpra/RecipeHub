import { MongoClient, ObjectId } from 'mongodb';
import { usersCollection, recipesCollection } from '../config/mongoCollections.js';
import helperFunctions from '../helpers.js';

export const addShoppingListItem = async (userId, recipeId) => {
    userId = helperFunctions.checkId(userId);
    recipeId = helperFunctions.checkId(recipeId);

    const usersCol = await usersCollection();
    const recipesCol = await recipesCollection();

    const recipe = await recipesCol.findOne({ _id: new ObjectId(recipeId) });
    if (!recipe) throw new Error('No recipe found with the indicated ID.');

    const user = await usersCol.findOne({ _id: new ObjectId(userId) });
    if (!user) throw new Error('No user found with the indicated ID.');

    const currentShoppingList = Array.isArray(user.shoppingList) ? user.shoppingList : [];

    if (currentShoppingList.includes(recipeId)) return;

    currentShoppingList.push(recipeId);

    const updateInfo = await usersCol.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { shoppingList: currentShoppingList } }
    );

    if (updateInfo.modifiedCount === 0) {
        throw new Error('Failed to add recipe to the shopping list.');
    }
};

export const removeShoppingListItem = async (userId, recipeId) => {
    userId = helperFunctions.checkId(userId);
    recipeId = helperFunctions.checkId(recipeId);

    const usersCol = await usersCollection();

    const user = await usersCol.findOne({ _id: new ObjectId(userId) });
    if (!user) throw new Error('No user found with the indicated ID.');

    const currentShoppingList = Array.isArray(user.shoppingList) ? user.shoppingList : [];

    const updatedShoppingList = currentShoppingList.filter((id) => id !== recipeId);

    const updateInfo = await usersCol.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { shoppingList: updatedShoppingList } }
    );

    if (updateInfo.modifiedCount === 0) {
        throw new Error('Failed to remove recipe from the shopping list.');
    }
};

export const getShoppingList = async (userId) => {
    userId = helperFunctions.checkId(userId);

    const usersCol = await usersCollection();
    const recipesCol = await recipesCollection();

    const user = await usersCol.findOne({ _id: new ObjectId(userId) });
    if (!user) throw new Error('No user found with the indicated ID.');

    const shoppingList = Array.isArray(user.shoppingList) ? user.shoppingList : [];

    const detailedShoppingList = [];

    for (let recipeId of shoppingList) {
        if (!ObjectId.isValid(recipeId)) {
            console.warn(`Skipping invalid recipe ID: ${recipeId}`);
            continue;
        }

        const recipe = await recipesCol.findOne({ _id: new ObjectId(recipeId) });
        if (recipe) {
            detailedShoppingList.push({
                _id: recipe._id.toString(),
                name: recipe.name,
                ingredients: recipe.ingredients,
            });
        }
    }

    return detailedShoppingList;
};
