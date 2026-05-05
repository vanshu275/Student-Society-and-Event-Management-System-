import express from 'express' ;
import { followSociety } from '../controllers/society.controller.js';

import { protect , authorize } from '../middleware/auth.middleware.js';

const router = express.Router()

router.patch('/follow/:societyId', protect, followSociety);


export default router