import express from 'express';
import controllerWrapper from '../utils/controllerWrapper.js';
import { getCarInfoHandler, getCarMakeInfoHandler } from '../controllers/info.js';

const router = express.Router();

router.get('/', controllerWrapper(getCarInfoHandler));
router.get('/:id', controllerWrapper(getCarMakeInfoHandler));

export default router;
