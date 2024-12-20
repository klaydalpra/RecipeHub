import {MongoClient, ObjectId} from 'mongodb';
import { recipesCollection } from '../config/mongoCollections.js';
import { reviewsCollection } from '../config/mongoCollections.js';
import { usersCollection } from '../config/mongoCollections.js';
import {closeConnection} from '../config/mongoConnections.js';
import { recipeData } from './index.js';
import { userData } from './index.js';
import  helperFunctions from '../helpers.js';

//test

const addReview = async (recipeId, reviewerId, userId, reviewText, rating) => {
    recipeId = helperFunctions.checkId(recipeId);
    reviewerId = helperFunctions.checkId(reviewerId);
    helperFunctions.checkText(reviewText);
    helperFunctions.checkRating(rating);

    const reviewsCol = await reviewsCollection();

    const newReview = {
        _id: new ObjectId(),
        recipeId: recipeId,
        reviewerId: reviewerId,
        userId: userId,
        reviewText: reviewText,
        rating: rating,
        comments: []
    };

    const insertInfo = await reviewsCol.insertOne(newReview);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw new Error('Could not add review');

    const newId = insertInfo.insertedId;
    const review = await reviewsCol.findOne({ _id: newId });

    const recipesCol = await recipesCollection();
    const recipe = await recipeData.getRecipeById(recipeId);
    let currentRecipeReviewIds = Array.isArray(recipe.reviewIds) ? recipe.reviewIds : [];
    currentRecipeReviewIds.push(newId.toString());
    const updatedRecipe = {
        reviewIds: currentRecipeReviewIds
    };

    await recipesCol.updateOne(
        { _id: new ObjectId(recipeId) },
        { $set: updatedRecipe },
        { returnDocument: 'after' }
    );

    const usersCol = await usersCollection();
    const user = await userData.getUserById(reviewerId);
    let currentUserReviewIds = Array.isArray(user.reviewIds) ? user.reviewIds : [];
    currentUserReviewIds.push(newId.toString());
    const updatedUser = {
        reviewIds: currentUserReviewIds
    };

    await usersCol.updateOne(
        { _id: new ObjectId(reviewerId) },
        { $set: updatedUser },
        { returnDocument: 'after' }
    );

    return review;
};


const getAllRecipeReviews = async (recipeId) => {
    recipeId = helperFunctions.checkId(recipeId);
    const recipe = await recipeData.getRecipeById(recipeId);

    const recipeReviewIds = Array.isArray(recipe.reviewIds)
        ? recipe.reviewIds.map((reviewId) => new ObjectId(reviewId))
        : [];


    const reviewsCol = await reviewsCollection();
    const reviews = recipeReviewIds.length > 0
        ? await reviewsCol.find({ _id: { $in: recipeReviewIds } }).toArray()
        : [];

    return reviews;
};


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

const addReviewComment = async (comment, reviewId, userId) => {
    reviewId = helperFunctions.checkId(reviewId);
    helperFunctions.checkText(comment);
    const reviewsCol = await reviewsCollection();
    const review = await reviewsCol.findOne({_id: new ObjectId(reviewId)});
    if (review === null) throw new Error(`Could not find review with id of ${id}`);
    let currentComments = review.comments;
    currentComments.push({comment: comment, author: userId});
    const updatedComments = {
        comments: currentComments
    };

    const updatedReview = await reviewsCol.updateOne(
        {_id: new ObjectId(reviewId)},
        {$set: updatedComments},
        {returnDocument: 'after'}
    );

    if (!updatedReview) throw new Error (`Could not update review with id of ${reviewId}`);
    
    return updatedReview;
}

const getReviewById = async (reviewId) => {
    reviewId = helperFunctions.checkId(reviewId);

    const reviewsCol = await reviewsCollection();
    const review = await reviewsCol.findOne({ _id: new ObjectId(reviewId) });

    if (!review) {
        throw new Error(`No review found with ID: ${reviewId}`);
    }

    return review;
};

export { addReview, getAllRecipeReviews, getAllUserReviews, addReviewComment,getReviewById };