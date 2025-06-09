import express from 'express';
import authHandler from '../middleware/authHandler.js';
import controllerWrapper from '../utils/controllerWrapper.js';
import { getAnyProfileHandler, getCurrentProfileHandler } from '../controllers/user.js';

const router = express.Router();

router.get('/', authHandler, controllerWrapper(getCurrentProfileHandler));
router.get('/:id', controllerWrapper(getAnyProfileHandler));

export default router;
