import { Router } from 'express';
const router = Router();
import authController from '../../controllers/user/auth.controller.js';


// POST /api/auth/register
// POST /api/auth/login
console.log('wer er here login')
router.post('/login', authController.login);
// router.post('register', register);

export default router;