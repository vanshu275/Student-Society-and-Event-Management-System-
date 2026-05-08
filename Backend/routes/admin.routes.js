import express from 'express';

import { makeSocietyHead } from '../controllers/admin.controller.js';

import {
    protect,
    authorize
} from '../middleware/auth.middleware.js';

const router = express.Router();

/* ONLY ADMIN */
router.patch(
    '/make-society-head/:userId',
    protect,
    authorize('admin'),
    makeSocietyHead
);

export default router;