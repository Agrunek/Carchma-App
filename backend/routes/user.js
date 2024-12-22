import express from 'express';
import authHandler from '../middleware/authHandler.js';
import controllerWrapper from '../utils/controllerWrapper.js';
import { anyProfileHandler, currentProfileHandler } from '../controllers/user.js';

const router = express.Router();

router.get('/', authHandler, controllerWrapper(currentProfileHandler));
router.get('/:id', controllerWrapper(anyProfileHandler));

export default router;
