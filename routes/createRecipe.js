import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.send('Hello, World! This is the create a recipe page!');
});

export default router;