import { MongoClient, ObjectId } from 'mongodb';
import { usersCollection } from '../config/mongoCollections.js';
import { recipesCollection } from '../config/mongoCollections.js';
import * as hF from '../helpers.js';


export const addShoppingListItem = async (userId, recipeId) => {
    userId = hF.checkIsStr(userId);
    recipeId = hF.checkIsStr(recipeId);
    if (!ObjectId.isValid(recipeId)) throw 'invalid id object for team';
    const usersCol = await usersCollection();
    const recipesCol = await recipesCollection();
    let recipe = await recipesCol.findOne({ recipeId: new ObjectId(recipeId) }); // check if recipe exists
    if (recipe === "null" || typeof recipe === 'undefined') throw "No recipe found with indicated ID";
    let user = await usersCol.findOne({ userId: userId }); // check if user exists
    if (user === null) throw 'No user with indicated id';
    let updatedShoppingList = [];
    if (user.shoppingList === "null"                // check if user has a shopping list already
        || typeof user.shoppingList === 'undefined'
        || user.shoppingList.length === 0) {
        updatedShoppingList.push(recipeId);
    }
    else { // if shopping list exists, add requested recipeId to existing shopping list in mongoDB
        updatedShoppingList = Object.values(user.shoppingList);

        if (updatedShoppingList.includes(recipeId)) return;
        updatedShoppingList.push(recipeId);
    }
    await usersCol.findOneAndUpdate(
        { userId: userId },
        { $set: { shoppingList: updatedShoppingList } }, { returnDocument: 'after' });
};

export const removeShoppingListItem = async (userId, recipeId) => {
    userId = hF.checkIsStr(userId);
    recipeId = hF.checkIsStr(recipeId);
    if (!ObjectId.isValid(recipeId)) throw 'invalid id object for recipe';
    let usersCol = await usersCollection();
    let user = await usersCol.findOne({ userId: userId }); // check if user exists
    if (user === null) throw 'No user with indicated id';
    
    let updatedShoppingList = user.shoppingList;
    let newList = [];
    for (let i = 0; i < updatedShoppingList.length; i++){
        if (recipeId !== updatedShoppingList[i]){
            newList.push(updatedShoppingList[i]);
        } else{
            console.log('deleting recipe');
        }
    }
        await usersCol.findOneAndUpdate(
            { userId: userId },
            { $set: { shoppingList: newList } }, { returnDocument: 'after' });
    
};
  
    export const getShoppingList = async (userId) => {
        userId = hF.checkIsStr(userId);
        let iList = {};
        let usersCol = await usersCollection();
        let user = await usersCol.findOne({ userId: userId }); // check if user exists
        if (user === null) throw 'No user with indicated id';
        if (user.shoppingList === null){
            return user.shoppingList = [];
        }
        for (let i=0; i<user.shoppingList.length; i++){
            let x = user.shoppingList[i];
            if (!ObjectId.isValid(x)) throw 'invalid id object id for recipe';
            let recipiesCol = await recipesCollection();
            let recipe = await recipiesCol.findOne({ _id: new ObjectId(x)});
            iList[recipe._id] = {};
            iList[recipe._id].ingredients = recipe.ingredients;
            iList[recipe._id].recipeId = x;
            iList[recipe._id].name = recipe.name;
        }
        return iList;
    };
    export const getShoppingListArr = async (userId) => {
        userId = hF.checkIsStr(userId);
        let shoppingList = [];
        let usersCol = await usersCollection();
        let user = await usersCol.findOne({ userId: userId }); // check if user exists
        if (user === null) throw 'No user with indicated id';
        if (user.shoppingList === null) return shoppingList;
        shoppingList = user.shoppingList;
        return shoppingList;
    };

