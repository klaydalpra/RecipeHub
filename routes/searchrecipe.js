import {Router} from 'express';
const router = Router();
import {getAllRecipes} from '../data/recipes.js';



router.route('/').post(async (req, res) =>{

    const searchByTitle = req.body.searchByTitle?.trim();
    const recipes = await getAllRecipes();
    return res.render('searchResults', { 
        title: 'Recipes Found', 
        searchByTitle,
        recipes 
      });
  });



  export default router;