import { Router } from 'express';
import authRoutes from './user/auth.routes.js';
import userRoutes from './user/user.routes.js';
import journalEntryRoutes from './journal-entry.routes.js';
import recipeRoutes from './recipe.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/journal-entries', journalEntryRoutes);
router.use('/recipes', recipeRoutes);

export default router;
