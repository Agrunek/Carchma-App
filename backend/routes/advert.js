import express from 'express';
import authHandler from '../middleware/authHandler.js';
import controllerWrapper from '../utils/controllerWrapper.js';
import { getAdvertHandler, patchAdvertHandler, postAdvertHandler } from '../controllers/advert.js';

const router = express.Router();

router.post('/', authHandler, controllerWrapper(postAdvertHandler));
router.patch('/:id', authHandler, controllerWrapper(patchAdvertHandler));
router.get('/:id', controllerWrapper(getAdvertHandler));

export default router;
