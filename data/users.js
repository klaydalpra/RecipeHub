import { MongoClient, ObjectId } from 'mongodb';
import { usersCollection } from '../config/mongoCollections.js';
import { closeConnection } from '../config/mongoConnections.js';
import bcrypt from 'bcrypt';
import { recipeData } from './index.js';
export const signUpUser = async (
  firstName,
  lastName,
  userId,
  password,
  favoriteQuote,
  themePreference,
  role
) => {
    
    if(!firstName || typeof firstName !== 'string' || firstName.trim().length < 2){
        throw new Error('Invalid first name.');
    }
    
    if(!lastName || typeof lastName !== 'string' || lastName.trim().length < 2){
        throw new Error('Invalid last name.');
    }
    if(!userId || typeof userId !== 'string' || userId.trim().length < 5){
        throw new Error('Invalid user ID.');
    }
    if(!password || password.length < 8) {
        throw new Error('Invalid password.');
    }
    if(!favoriteQuote || favoriteQuote.trim().length < 10) {
        throw new Error('Invalid favorite quote.');
    }
    if(!themePreference || !themePreference.backgroundColor || !themePreference.fontColor) {
        throw new Error('Invalid theme preference.');
    }
    if(!['admin', 'user'].includes(role.toLowerCase())) {
        throw new Error('Invalid role.');
    }
    const bcrypt = await import('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 16);
    const usersCol = await usersCollection();
    const existingUser = await usersCol.findOne({ userId: userId.toLowerCase() });
    if(existingUser) {
        throw new Error('User ID already exists.');
    }
    const newUser = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        userId: userId.toLowerCase(),
        password: hashedPassword,
        favoriteQuote: favoriteQuote.trim(),
        themePreference: {backgroundColor: themePreference.backgroundColor.toLowerCase(),fontColor: themePreference.fontColor.toLowerCase(),},
        role: role.toLowerCase(),
        recipeIds: [],
        reviewIds: [],
        savedRecipeIds: [],
        followingUserIds: []
    };
    const insertResult = await usersCol.insertOne(newUser);
    if(!insertResult.acknowledged) {
        throw new Error('Failed to create user.');
    }
    return{
        registrationCompleted: true
    };
};

export const getUserById = async(id) => {
    helperFunctions.checkId(id);
    const usersCol = await usersCollection();
    const user = await usersCol.findOne({_id: new ObjectId(id)});
    if (user === null) throw `Could not find user with id of ${id}`;

    user._id = user._id.toString();
  
    return user;
}

export const saveRecipe = async (recipeId, userId) => {
    helperFunctions.checkId(recipeId);
    helperFunctions.checkId(userId);
    const usersCol = await usersCollection();
    const user = await usersCol.findOne({_id: new ObjectId(userId)});
    let currentSavedRecipeIds = user.savedRecipeIds;
    currentSavedRecipeIds.push(recipeId)
    const newSavedRecipeIds = {
        savedRecipeIds: currentSavedRecipeIds
    }
    const updatedUser = await usersCol.updateOne(
        {_id: new ObjectId(userId)},
        {$set: newSavedRecipeIds},
        {returnDocument: 'after'}
    );

    if (!updatedUser) throw `Could not add comment to review with id of ${userId}`;

    recipeData.recipeSaved(recipeId, userId);

    return updatedUser;
}

export const closeDbConnection = async () => {
  await closeConnection();
};
