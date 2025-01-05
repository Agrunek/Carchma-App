import express from 'express';
import controllerWrapper from '../utils/controllerWrapper.js';
import { carInfoHandler, carMakeInfoHandler } from '../controllers/info.js';

const router = express.Router();

router.get('/', controllerWrapper(carInfoHandler));
router.get('/:id', controllerWrapper(carMakeInfoHandler));

export default router;
