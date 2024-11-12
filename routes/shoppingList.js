import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.send('Hello, World! This is the shopping list for the current authenticated session!');
});

export default router;