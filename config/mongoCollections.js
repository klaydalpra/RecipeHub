import { dbConnection } from './mongoConnections.js';

const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

export const recipesCollection = getCollectionFn('recipe');
export const usersCollection = getCollectionFn('users');
export const reviewsCollection = getCollectionFn('reviews');

