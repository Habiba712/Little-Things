import { Router } from 'express';
import authRoutes from './user/auth.routes.js';
import userRoutes from './user/user.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;