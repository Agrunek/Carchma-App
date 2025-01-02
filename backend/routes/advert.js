import express from 'express';
import authHandler from '../middleware/authHandler.js';
import controllerWrapper from '../utils/controllerWrapper.js';
import { patchAdvertHandler, postAdvertHandler } from '../controllers/advert.js';

const router = express.Router();

router.post('/', authHandler, controllerWrapper(postAdvertHandler));
router.patch('/:id', authHandler, controllerWrapper(patchAdvertHandler));

export default router;
