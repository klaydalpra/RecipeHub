import { MongoClient, ObjectId } from 'mongodb';
import { reviewsCollection } from '../config/mongoCollections.js';
import { closeConnection } from '../config/mongoConnections.js';
import { reviewData } from './index.js';
import { helperFunctions } from '../helpers.js';

const addComment = async (userId, reviewId, commentText) => {
    helperFunctions.checkId(userId);
    helperFunctions.checkId(reviewId);
    helperFunctions.checkCommentText(commentText);

    const reviewsCol = await reviewsCollection();

    const newComment = {
        _id: new ObjectId(),
        userId: userId,
        commentText: commentText
    };

    const review = await reviewsCol.findOne({_id: new ObjectId(reviewId)});

    let currentComments = review.comments;
    currentComments.push(newComment);

    const newComments = {
        comments: currentComments
    }

    const updatedReview = await reviewsCol.updateOne(
        {_id: new ObjectId(reviewId)},
        {$set: newComments},
        {returnDocument: 'after'}
    );

    if (!updatedReview) throw `Could not add comment to review with id of ${reviewId}`;

    return updatedReview;
}

export { addComment };