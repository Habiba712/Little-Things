import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import recipeController from '../controllers/recipe.controller.js';

const router = Router();
router.use(authMiddleware);
router.get('/', recipeController.list);
router.post('/', recipeController.create);
router.delete('/:id', recipeController.remove);

export default router;
