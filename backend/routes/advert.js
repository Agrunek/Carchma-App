import express from 'express';
import authHandler from '../middleware/authHandler.js';
import controllerWrapper from '../utils/controllerWrapper.js';
import { postAdvertFirstStepHandler, postAdvertSecondStepHandler } from '../controllers/advert.js';

const router = express.Router();

router.post('/1', authHandler, controllerWrapper(postAdvertFirstStepHandler));
router.post('/2/:id', authHandler, controllerWrapper(postAdvertSecondStepHandler));

export default router;
