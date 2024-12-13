
import { ObjectId } from 'mongodb';
import { Router } from 'express';
import *as sdata from '../data/shoppingList.js';
const router = Router();
import { ensureAuthenticated } from '../middleware/authMiddleware.js';
import * as hF from '../helpers.js';
import xss from 'xss';

router.use(ensureAuthenticated);

router
  .route('/')
  .get(async (req, res) => {
    let userXId = xss(req.session.user);
    try {
      userXId = hF.checkIsStr(userXId);
    } catch (e) {
      return res.status(400).render('error.handlebars', {message: e});
    }
    try {
      let ingredients = await sdata.getShoppingList(userXId);
      let shopMessage = '';
      if (Object.keys(ingredients).length === 0 ||ingredients === "null" || typeof ingredients === 'undefined'){
        shopMessage = 'Shopping List is Empty!';
        return res.status(200).render('shoppingList.handlebars', {shopMessage: shopMessage}); //
      } else{
      return res.status(200).render('shoppingList.handlebars', {shoppingList: ingredients});
      }
    } catch (e) {
      return res.status(404).render('error.handlebars', {message: e});
    }
  })


  
  router
  .route('/:recipeId')
  .post(async (req, res) => {
    let userXId = xss(req.session.user);
    let recipeX = xss(req.params.recipeId);
    try {
    if (!ObjectId.isValid(recipeX)) throw 'invalid id object for recipe';
    } catch (e) {
      return res.status(400).render('error.handlebars', {message: e});
    }
    try {
      await sdata.addShoppingListItem(userXId, recipeX);
      return res.status(200).redirect('/shopping-list');
    } catch (e) {
      return res.status(404).render('error.handlebars', {message: e});
    }
  })

  .get(async (req, res) => {
    let userXId = xss(req.session.user);
    let recipeX = xss(req.params.recipeId);
    try {
    if (!ObjectId.isValid(recipeX)) throw 'invalid id object for recipe';
    } catch (e) {
      return res.status(400).render('error.handlebars', {message: e});
    }
    try {
      await sdata.removeShoppingListItem(userXId, recipeX);
      return res.status(200).redirect('/shopping-list');
    } catch (e) {
      return res.status(404).render('error.handlebars', {message: e});
    }
  });

export default router;
