import { getMe } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

router.get('/me', protect, getMe);