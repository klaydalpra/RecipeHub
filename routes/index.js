
import loginRoutes from './login.js';
import createRecipeRoutes from './createRecipe.js';
import recipeRoute from './recipe.js';
import homeRoute from './homepage.js';
import profileRoute from './profile.js';
import favoriteRoute from './favorites.js';
import shoppingRoute from './shoppingList.js';

const constructorMethod = (app) => {
  app.use('/login', loginRoutes);
  app.use('/create-recipe', createRecipeRoutes);
  app.use('/recipe', recipeRoute);
  app.use('/home', homeRoute);
  app.use('/profile', profileRoute);
  app.use('/favorites', favoriteRoute);
  app.use('/shopping-list', shoppingRoute);

  app.get('/', (req, res) => {
    res.redirect('/home');
  });

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
};

export default constructorMethod;