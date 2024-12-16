import { dbConnection, closeConnection } from '../config/mongoConnections.js';
import { recipeData } from '../data/index.js';
import { reviewData } from '../data/index.js';
import { userData } from '../data/index.js';
import { shoppingListData } from '../data/index.js';

const db = await dbConnection();
await db.dropDatabase();

// Adding users
let users = [
    { firstName: 'Billy', lastName: 'Joel', email: 'BJ123@hotmail.com', username: 'EpicBilly', password: 'P@ssword123' },
    { firstName: 'John', lastName: 'Allen', email: 'JA123@hotmail.com', username: 'JohnnyA', password: 'P@ssword123' },
    { firstName: 'Cassandra', lastName: 'Waters', email: 'CW123@hotmail.com', username: 'Cassygirl', password: 'P@ssword123' },
    { firstName: 'Linda', lastName: 'Smith', email: 'LS123@hotmail.com', username: 'LindaLove', password: 'P@ssword123' },
    { firstName: 'Tom', lastName: 'Harris', email: 'TH123@hotmail.com', username: 'TommyH', password: 'P@ssword123' },
    { firstName: 'Sarah', lastName: 'Johnson', email: 'SJ123@hotmail.com', username: 'SassySarah', password: 'P@ssword123' },
    { firstName: 'Jake', lastName: 'Williams', email: 'JW123@hotmail.com', username: 'JakeTheGreat', password: 'P@ssword123' },
    { firstName: 'Emily', lastName: 'Brown', email: 'EB123@hotmail.com', username: 'EmmyB', password: 'P@ssword123' },
    { firstName: 'Michael', lastName: 'Green', email: 'MG123@hotmail.com', username: 'MikeGreen', password: 'P@ssword123' },
    { firstName: 'Sophia', lastName: 'Taylor', email: 'ST123@hotmail.com', username: 'SophiaT', password: 'P@ssword123' }
];

let userIds = [];
let userUsernames = [];
for (let user of users) {
    let newUserId = await userData.signUpUser(user.firstName, user.lastName, user.email, user.username, user.password);
    newUserId = newUserId.toString()
    userIds.push(newUserId);
    userUsernames.push(user.username);
}

// Adding recipes
let recipes = [
    { 
        name: 'Carbonara', 
        ingredients: { 'Pasta': '1 box', 'Eggs': '2', 'Parmesan': '1 cup', 'Bacon': '8 slices', 'Parsley': '1 handful' }, 
        steps: ['Boil pasta', 'Mix egg yolks with parmesan', 'Season to taste', 'Mix pasta with eggs and cheese', 'Sprinkle with parmesan', 'Sprinkle with parsley'], 
        cuisine: 'Italian', 
        userId: userIds[0] 
    },
    { 
        name: 'Chocolate Cake', 
        ingredients: { 'Flour': '2 cups', 'Sugar': '1.5 cups', 'Cocoa Powder': '0.75 cup', 'Eggs': '3', 'Butter': '1 cup', 'Milk': '1 cup' }, 
        steps: ['Preheat oven to 350F', 'Mix dry ingredients', 'Add eggs, butter, and milk', 'Pour into pan and bake for 30 minutes', 'Cool before serving'], 
        cuisine: 'Dessert', 
        userId: userIds[2] 
    },
    { 
        name: 'Avocado Toast', 
        ingredients: { 'Bread': '2 slices', 'Avocado': '1', 'Salt': 'to taste', 'Pepper': 'to taste', 'Lemon Juice': '1 tsp' }, 
        steps: ['Toast the bread', 'Mash the avocado and mix with salt, pepper, and lemon juice', 'Spread avocado mixture on bread', 'Serve immediately'], 
        cuisine: 'Breakfast', 
        userId: userIds[4] 
    },
    {
        name: 'Tacos',
        ingredients: { 'Tortillas': '8', 'Ground Beef': '1 lb', 'Cheese': '1 cup', 'Lettuce': '1 cup', 'Tomatoes': '1 cup' },
        steps: ['Cook ground beef', 'Prepare toppings', 'Assemble tacos', 'Serve immediately'],
        cuisine: 'Mexican',
        userId: userIds[1]
    },
    {
        name: 'Caesar Salad',
        ingredients: { 'Romaine Lettuce': '1 head', 'Croutons': '1 cup', 'Parmesan': '0.5 cup', 'Caesar Dressing': '0.25 cup' },
        steps: ['Chop lettuce', 'Add croutons and parmesan', 'Toss with dressing'],
        cuisine: 'Salad',
        userId: userIds[3]
    },
    {
        name: 'Grilled Cheese',
        ingredients: { 'Bread': '2 slices', 'Cheese': '2 slices', 'Butter': '2 tbsp' },
        steps: ['Butter bread', 'Place cheese between slices', 'Grill until golden brown'],
        cuisine: 'Snack',
        userId: userIds[5]
    },
    {
        name: 'Tomato Soup',
        ingredients: { 'Tomatoes': '4', 'Onion': '1', 'Garlic': '2 cloves', 'Vegetable Broth': '2 cups' },
        steps: ['Saute onions and garlic', 'Add tomatoes and broth', 'Simmer and blend'],
        cuisine: 'Soup',
        userId: userIds[6]
    },
    {
        name: 'BBQ Ribs',
        ingredients: { 'Ribs': '2 lbs', 'BBQ Sauce': '1 cup', 'Brown Sugar': '2 tbsp', 'Spices': 'to taste' },
        steps: ['Season ribs', 'Bake at 300F for 2 hours', 'Brush with sauce and broil'],
        cuisine: 'BBQ',
        userId: userIds[7]
    },
    {
        name: 'Pancakes',
        ingredients: { 'Flour': '1 cup', 'Milk': '1 cup', 'Egg': '1', 'Sugar': '2 tbsp', 'Butter': '2 tbsp' },
        steps: ['Mix ingredients', 'Cook on griddle', 'Serve with syrup'],
        cuisine: 'Breakfast',
        userId: userIds[8]
    },
    {
        name: 'Lasagna',
        ingredients: { 'Lasagna Noodles': '1 box', 'Ricotta Cheese': '1 cup', 'Mozzarella Cheese': '2 cups', 'Marinara Sauce': '3 cups' },
        steps: ['Cook noodles', 'Layer ingredients in pan', 'Bake at 375F for 45 minutes'],
        cuisine: 'Italian',
        userId: userIds[9]
    }
];

let recipeIds = [];
for (let recipe of recipes) {
    let newRecipe = await recipeData.addRecipe(recipe.name, recipe.ingredients, recipe.steps, recipe.cuisine, recipe.userId);
    recipeIds.push(newRecipe._id.toString());
}

const review1 = await reviewData.addReview(recipeIds[0], userIds[1], userUsernames[1], 'Amazing Carbonara recipe!', '9');
await reviewData.addReviewComment('Totally agree, it was delicious!', review1._id.toString(), userUsernames[2]);
await reviewData.addReviewComment('Can’t wait to try it again!', review1._id.toString(), userUsernames[3]);

const review2 = await reviewData.addReview(recipeIds[1], userIds[4], userUsernames[4],'Best chocolate cake ever!', '10');
await reviewData.addReviewComment('This was my favorite too!', review2._id.toString(), userUsernames[5]);
await reviewData.addReviewComment('Made it twice already!', review2._id.toString(), userUsernames[6]);

const review3 = await reviewData.addReview(recipeIds[2], userIds[7], userUsernames[7],'Quick and tasty avocado toast.', '8');
await reviewData.addReviewComment('Perfect for a quick breakfast.', review3._id.toString(), userUsernames[8]);
await reviewData.addReviewComment('Added some chili flakes, loved it!', review3._id.toString(), userUsernames[9]);

const review4 = await reviewData.addReview(recipeIds[3], userIds[0], userUsernames[0],'Tacos were amazing and easy to make.', '9');
await reviewData.addReviewComment('I added extra cheese, yum!', review4._id.toString(), userUsernames[2]);
await reviewData.addReviewComment('Great recipe for family dinner.', review4._id.toString(), userUsernames[3]);

const review5 = await reviewData.addReview(recipeIds[4], userIds[1], userUsernames[1],'Simple yet delicious Caesar Salad.', '8');
await reviewData.addReviewComment('A healthy and quick option!', review5._id.toString(), userUsernames[4]);
await reviewData.addReviewComment('Will make this again.', review5._id.toString(), userUsernames[5]);

await userData.saveRecipe(recipeIds[0], userIds[1]);
await userData.saveRecipe(recipeIds[1], userIds[2]);
await userData.saveRecipe(recipeIds[2], userIds[3]);
await userData.saveRecipe(recipeIds[3], userIds[4]);
await userData.saveRecipe(recipeIds[4], userIds[5]);
await userData.saveRecipe(recipeIds[5], userIds[6]);
await userData.saveRecipe(recipeIds[6], userIds[7]);
await userData.saveRecipe(recipeIds[7], userIds[8]);
await userData.saveRecipe(recipeIds[8], userIds[9]);
await userData.saveRecipe(recipeIds[9], userIds[0]);

await userData.followUser(userIds[0], userIds[1]);
await userData.followUser(userIds[1], userIds[2]);
await userData.followUser(userIds[2], userIds[3]);
await userData.followUser(userIds[3], userIds[4]);
await userData.followUser(userIds[4], userIds[5]);
await userData.followUser(userIds[5], userIds[6]);
await userData.followUser(userIds[6], userIds[7]);
await userData.followUser(userIds[7], userIds[8]);
await userData.followUser(userIds[8], userIds[9]);
await userData.followUser(userIds[9], userIds[0]);

console.log('Done seeding database');
await closeConnection();