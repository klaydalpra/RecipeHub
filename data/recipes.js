import {MongoClient, ObjectId} from 'mongodb';
import { recipesCollection } from '../config/mongoCollections.js';
import {closeConnection} from '../config/mongoConnections.js';


const addRecipe = async (name, ingredients, instructions, dateMade) => {

    const recipesCol = await recipesCollection();

    const newRecipe = {
        name,
        ingredients,
        instructions,
        dateMade
    };

    const insertInfo = await recipesCol.insertOne(newRecipe);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add recipe';

    const recipeId = insertInfo.insertedId;
    return { _id: recipeId, ...newRecipe };
}

export { addRecipe };