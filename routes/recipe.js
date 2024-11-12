import { Router } from 'express';
const router = Router();

router.get('/:recipeId', (req, res) => {
    const recipeId = req.params.recipeId;
    res.send(`Hello, World! This is the Recipe Page for Recipe ID: ${recipeId}`);
});

export default router;