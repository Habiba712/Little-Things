import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import journalEntryController from '../controllers/journal-entry.controller.js';

const router = Router();

router.use(authMiddleware);
router.get('/', journalEntryController.list);
router.post('/', journalEntryController.create);
router.delete('/:id', journalEntryController.remove);

export default router;
