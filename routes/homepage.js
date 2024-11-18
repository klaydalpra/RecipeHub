import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    //res.send('Hello, World! This is the homepage!');
    res.render('home', { title: 'RecipeHUB' });
});

export default router;