import { MongoClient, ObjectId } from 'mongodb';
import { usersCollection } from '../config/mongoCollections.js';
import { closeConnection } from '../config/mongoConnections.js';
import bcrypt from 'bcrypt';
import { recipeData } from './index.js';
import helperFunctions from '../helpers.js';

export const signUpUser = async (firstName, lastName, email, userId, password) => {
    if (!firstName || typeof firstName !== 'string' || firstName.trim().length < 2) {
        throw new Error('Invalid first name.');
    }

    if (!lastName || typeof lastName !== 'string' || lastName.trim().length < 2) {
        throw new Error('Invalid last name.');
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Invalid email format.');
    }

    if (!userId || typeof userId !== 'string' || userId.trim().length < 5) {
        throw new Error('Invalid user ID.');
    }

    if (!password ||!/[A-Z]/.test(password) ||!/[0-9]/.test(password) ||!/[\W]/.test(password) ||password.length < 8) {
        throw new Error('Invalid password. Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.');
    }
    const usersCol = await usersCollection();
    const existingUser = await usersCol.findOne({$or: [{ userId: userId.toLowerCase() }, { email: email.toLowerCase() }]});
    if (existingUser){
        throw new Error('User ID or email already exists.');
    } 

    const hashedPassword = await bcrypt.hash(password, 16);
    const newUser = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase(),
        userId: userId.toLowerCase(),
        password: hashedPassword,
        recipeIds: [],
        reviewIds: [],
        savedRecipeIds: [],
        followingUserIds: [],
        registeredDate: new Date().toISOString()
    };

    const insertResult = await usersCol.insertOne(newUser);
    if (!insertResult.acknowledged) {
        throw new Error('Failed to create user.');
    }

    return {
        registrationCompleted: true
    };
};

export const signInUser = async (userId, password) => {
    if (!userId || typeof userId !== 'string' || userId.trim().length < 5) {
        throw new Error('Invalid user ID.');
    }
    if (!password || typeof password !== 'string' || password.trim().length < 8) {
        throw new Error('Invalid password.');
    }

    const usersCol = await usersCollection();
    const user = await usersCol.findOne({ userId: userId.toLowerCase() });

    if (!user) {
        throw new Error('Either the user ID or password is invalid.');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Either the user ID or password is invalid.');
    }

    return {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userId: user.userId,
        recipeIds: user.recipeIds,
        reviewIds: user.reviewIds,
        savedRecipeIds: user.savedRecipeIds,
        followingUserIds: user.followingUserIds
    };
};

export const getUserById = async (id) => {
    helperFunctions.checkId(id);
    const usersCol = await usersCollection();
    const user = await usersCol.findOne({ _id: new ObjectId(id) });
    if (!user) throw new Error(`Could not find user with ID: ${id}`);

    user._id = user._id.toString();
    return user;
};

export const getUserById2 = async (id) => {
    helperFunctions.checkId(id);
    const usersCol = await usersCollection();
    const user = await usersCol.findOne({ _id: new ObjectId(id) });
    if (!user) throw new Error(`Could not find user with ID: ${id}`);

    const name = user.userId.toString();
    return name;
};

export const saveRecipe = async (recipeId, userId) => {
    helperFunctions.checkId(recipeId);
    helperFunctions.checkId(userId);
    const usersCol = await usersCollection();
    const user = await usersCol.findOne({ _id: new ObjectId(userId) });

    if (!user) {
        throw new Error(`User with ID: ${userId} does not exist.`);
    }

    let currentSavedRecipeIds = Array.isArray(user.savedRecipeIds) ? user.savedRecipeIds : [];
    if (currentSavedRecipeIds.includes(recipeId)) throw new Error('This recipe has already been saved');
    currentSavedRecipeIds.push(recipeId);

    const updatedUser = await usersCol.updateOne(
        { _id: new ObjectId(userId) },
        { $set: { savedRecipeIds: currentSavedRecipeIds } },
        { returnDocument: 'after' }
    );

    if (!updatedUser.acknowledged) {
        throw new Error(`Could not save recipe ${recipeId} for user ${userId}.`);
    }

    await recipeData.recipeSaved(recipeId, userId);

    return updatedUser;
};

export const closeDbConnection = async () => {
    await closeConnection();
};
