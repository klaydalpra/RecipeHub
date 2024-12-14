
import { ObjectId } from 'mongodb';
import { Router } from 'express';
import * as sdata from '../data/shoppingList.js';
const router = Router();
import { ensureAuthenticated } from '../middleware/authMiddleware.js';
import helperFunctions from '../helpers.js';
import xss from 'xss';

router.use(ensureAuthenticated);

router.get('/', async (req, res) => {
  const userId = req.session.user.id;

  try {
      const shoppingList = await sdata.getShoppingList(userId);

      if (shoppingList.length === 0) {
          return res.status(200).render('shoppingList', {
              shopMessage: 'Your shopping list is empty!',
          });
      }

      res.status(200).render('shoppingList', { shoppingList });
  } catch (e) {
      console.error('Error fetching shopping list:', e.message);
      res.status(500).render('error', { message: 'Failed to load shopping list.' });
  }
});

router.post('/:recipeId', async (req, res) => {
  const userId = req.session.user.id;
  const recipeId = req.params.recipeId;

  try {
      await sdata.addShoppingListItem(userId, recipeId);
      res.redirect('/shopping-list');
  } catch (e) {
      console.error('Error adding to shopping list:', e.message);
      res.status(400).render('error', { message: e.message });
  }
});

router.get('/:recipeId', async (req, res) => {
  const userId = req.session.user.id;
  const recipeId = req.params.recipeId;

  try {
      await sdata.removeShoppingListItem(userId, recipeId);
      res.redirect('/shopping-list');
  } catch (e) {
      console.error('Error removing from shopping list:', e.message);
      res.status(400).render('error', { message: e.message });
  }
});


export default router;
