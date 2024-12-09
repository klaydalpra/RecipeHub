import { MongoClient, ObjectId } from 'mongodb';
import { usersCollection } from '../config/mongoCollections.js';
import { closeConnection } from '../config/mongoConnections.js';
import bcrypt from 'bcrypt';
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
    };
    const insertResult = await usersCol.insertOne(newUser);
    if(!insertResult.acknowledged) {
        throw new Error('Failed to create user.');
    }
    return{
        registrationCompleted: true
    };
};

export const closeDbConnection = async () => {
  await closeConnection();
};
