import { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import journalEntryController from '../controllers/journal-entry.controller.js';

const router = Router();

router.use(authMiddleware);
router.get('/', journalEntryController.list);
router.post('/', journalEntryController.create);
router.put('/:id', journalEntryController.update);
router.patch('/:id', journalEntryController.update);
router.delete('/:id', journalEntryController.remove);

export default router;
