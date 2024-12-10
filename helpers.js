import {ObjectId} from 'mongodb';

export function checkId(id) {
    if (!id) throw "Must provide an ID";
    if (typeof id !== 'string') throw 'ID must be a string';
    id = id.trim();
    if (id.length === 0) throw 'ID must not be empty';
    if (!ObjectId.isValid(id)) throw 'Error: invalid object ID';
    return id;
}

export function checkReviewText(text) {
    return text;
}

export function checkRating(rating) {
    return rating;
}