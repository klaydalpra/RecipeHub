import { ObjectId } from 'mongodb';

const helperFunctions = {
    checkId(id) {
        if (!id) throw "Must provide an ID";
        if (typeof id !== 'string') throw 'ID must be a string';
        id = id.trim();
        if (id.length === 0) throw 'ID must not be empty';
        if (!ObjectId.isValid(id)) throw 'Error: invalid object ID';
        return id;
    },

    checkText(text) {
        if (!text) throw 'Must provide text';
        if (typeof text !== 'string') throw 'Text must be a string';
        if (text.trim().length === 0) throw 'Text must not be empty';
        if (text.length > 500 || text.length < 5) throw 'Text must be between 5-500 characters long'
    },

    checkRating(rating) {
        if (!rating) throw 'Must provide a rating';
        if (rating.trim().length === 0) throw 'Rating must not be empty';
        rating = parseInt(rating);
        if (typeof rating !== 'number') throw 'Rating must be a number';
        if (rating > 10 || rating < 0) throw 'Rating must be between 1-10;'
    }
};

export default helperFunctions;
