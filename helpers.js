import { ObjectId } from 'mongodb';

const helperFunctions = {
    checkId(id) {
        if (!id) throw new Error("Must provide an ID");
        if (typeof id !== 'string') throw new Error('ID must be a string');
        id = id.trim();
        if (id.length === 0) throw new Error('ID must not be empty');
        if (!ObjectId.isValid(id)) throw new Error('Error: invalid object ID');
        return id;
    },

    checkText(text) {
        if (!text) throw new Error('Must provide text');
        if (typeof text !== 'string') throw new Error('Text must be a string');
        if (text.trim().length === 0) throw new Error('Text must not be empty');
        if (text.length > 500 || text.length < 5) throw new Error('Text must be between 5-500 characters long');
    },

    checkRating(rating) {
        if (!rating) throw new Error('Must provide a rating');
        if (rating.trim().length === 0) throw new Error('Rating must not be empty');
        rating = parseInt(rating);
        if (typeof rating !== 'number') throw new Error('Rating must be a number');
        if (rating > 10 || rating < 0) throw new Error('Rating must be between 1-10');
    },

    checkEmail(email) {
        if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new Error('Invalid email format.');
        }
    },
    checkIsStr(input) {
        if (!input || typeof input !== 'string' || input.trim().length === 0) {
            throw new Error('Input must be a non-empty string.');
        }
        return input.trim();
    },
};



export default helperFunctions;
