import express from 'express' ;
import { createSociety, followSociety, getAllSocieties } from '../controllers/society.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router()
// Sabhi societies dekhne ke liye
router.get('/', getAllSocieties);

// Nayi society banane ke liye (Sirf Super Admin ke liye)
router.post('/create', protect, authorize('admin'), createSociety);

// Follow/Unfollow toggle
router.patch('/follow/:societyId', protect, followSociety);

export default router