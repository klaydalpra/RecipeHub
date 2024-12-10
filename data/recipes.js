import {MongoClient, ObjectId} from 'mongodb';
import { recipesCollection } from '../config/mongoCollections.js';
import {closeConnection} from '../config/mongoConnections.js';
import {ObjectId} from 'mongodb';
import * as helperFunctions from '../helpers.js';


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

const getAllRecipes = async () => {
    const recipesCol = await recipesCollection();
    const recipes = await recipesCol.find({}).toArray();
    return recipes;
}

const getRecipeById = async (id) => {
    helperFunctions.checkId(id);
    const recipesCol = await recipesCollection();
    const recipe = await recipesCol.findOne({_id: new ObjectId(id)});
    if (recipe === null) throw `Could not find recipe with id of ${id}`;

    recipe._id = recipe._id.toString();
  
    return recipe;
}

const recipeSaved = async (recipeId, userId) => {
    helperFunctions.checkId(recipeId);
    helperFunctions.checkId(userId);
    const recipesCol = await recipesCollection();
    const recipe = await recipesCol.findOne({_id: new ObjectId(recipeId)});
    let currentSavedByUserIds = recipe.savedByUserIds;
    currentSavedByUserIds.push(userId)
    const newSavedByUserIds = {
        savedByUserIds: currentSavedByUserIds
    }
    const updatedRecipe = await recipesCol.updateOne(
        {_id: new ObjectId(recipeId)},
        {$set: newSavedByUserIds},
        {returnDocument: 'after'}
    );

    if (!updatedRecipe) throw `Could not add comment to review with id of ${recipeId}`;

    return updatedRecipe;
}

export { addRecipe, getAllRecipes, getRecipeById, recipeSaved };