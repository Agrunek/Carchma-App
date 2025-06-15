import express from 'express';
import authHandler from '../middleware/authHandler.js';
import idHandler from '../middleware/idHandler.js';
import controllerWrapper from '../utils/controllerWrapper.js';
import { getAdvertHandler, getAdvertsHandler, patchAdvertHandler, postAdvertHandler } from '../controllers/advert.js';

const router = express.Router();

router.post('/', authHandler, controllerWrapper(postAdvertHandler));
router.patch('/:id', authHandler, idHandler, controllerWrapper(patchAdvertHandler));
router.get('/:id', idHandler, controllerWrapper(getAdvertHandler));
router.get('/', controllerWrapper(getAdvertsHandler));

export default router;
