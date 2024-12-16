// This file should import both data files and export them as shown in the lecture code
import * as recipeDataFunctions from './recipes.js';
import * as userDataFunctions from './users.js';
import * as shoppingListDataFunctions from './shoppingList.js';
import * as reviewDataFunctions from './reviews.js';

export const recipeData = recipeDataFunctions;
export const userData = userDataFunctions;
export const shoppingListData = shoppingListDataFunctions;
export const reviewData = reviewDataFunctions;