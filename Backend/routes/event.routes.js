import express from 'express';
import { createEvent, getAllEvents, registerForEvent  , getEventParticipants} from '../controllers/event.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public route: Koi bhi dekh sakta hai (Explore Page)
router.get('/', getAllEvents);

// Protected route: Login zaroori hai (Registration)
router.post('/register/:eventId', protect, registerForEvent);

// Admin route: Sirf Society Head ya Admin hi create kar payenge
router.post('/create', protect, authorize('society_head', 'admin'), createEvent);

// Sirf society_head hi participants ki list dekh sakta hai
router.get('/:eventId/participants', protect, authorize('society_head', 'admin'), getEventParticipants);

export default router;