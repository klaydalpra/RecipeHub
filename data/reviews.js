import {MongoClient, ObjectId} from 'mongodb';
import { recipesCollection } from '../config/mongoCollections.js';
import { reviewsCollection } from '../config/mongoCollections.js';
import { usersCollection } from '../config/mongoCollections.js';
import {closeConnection} from '../config/mongoConnections.js';
import { recipeData } from './index.js';
import { userData } from './index.js';
import  helperFunctions from '../helpers.js';

const addReview = async (recipeId, userId, reviewText, rating) => {
    helperFunctions.checkId(recipeId);
    helperFunctions.checkId(userId);
    helperFunctions.checkReviewText(reviewText);
    helperFunctions.checkRating(rating);

    const reviewsCol = await reviewsCollection();

    const newReview = {
        _id: new ObjectId(),
        recipeId: recipeId,
        userId: userId,
        reviewText: reviewText,
        rating: rating,
        comments: []
    };

    const insertInfo = await reviewsCol.insertOne(newReview);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add review';
  
    const newId = insertInfo.insertedId;
    const review = await reviewsCol.findOne({_id: newId});

    const recipesCollection = await recipesCollection();
    const recipe = await recipeData.getRecipeById(recipeId)
    let currentRecipeReviewIds = recipe.reviewIds;
    currentRecipeReviewIds.push(newId);
    const updatedRecipe = {
        reviewIds: currentRecipeReviewIds
    };

    await recipesCollection.updateOne(
        {_id: new ObjectId(recipeId)},
        {$set: updatedRecipe},
        {returnDocument: 'after'}
    );

    const usersCol = await usersCollection();
    const user = await userData.getUserById(userId)
    let currentUserReviewIds = user.reviewIds;
    currentUserReviewIds.push(newId);
    const updatedUser = {
        reviewIds: currentUserReviewIds
    };

    await usersCol.updateOne(
        {_id: new ObjectId(userId)},
        {$set: updatedUser},
        {returnDocument: 'after'}
    );

    return review;
}

const getAllRecipeReviews = async (recipeId) => {
    const recipe = await recipeData.getRecipeById(recipeId)
    const recipeReviewIds = recipe.reviewIds.map((reviewId) => new ObjectId(reviewId));

    const reviewsCol = await reviewsCollection();
    const reviews = reviewsCol.find(
        {_id: {
            $in: recipeReviewIds
        }}
    ).toArray();

    return reviews;
}

const getAllUserReviews = async (userId) => {
    const user = await userData.getUserById(userId)
    const userReviewIds = user.reviewIds((reviewId) => new ObjectId(reviewId));

    const reviewsCol = await reviewsCollection();
    const reviews = reviewsCol.find(
        {_id: {
            $in: userReviewIds
        }}
    ).toArray();

    return reviews;
}

export { addReview, getAllRecipeReviews, getAllUserReviews };