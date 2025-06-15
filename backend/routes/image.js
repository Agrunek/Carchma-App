import express from 'express';
import authHandler from '../middleware/authHandler.js';
import idHandler from '../middleware/idHandler.js';
import imagesUploadHandler from '../middleware/imagesUploadHandler.js';
import controllerWrapper from '../utils/controllerWrapper.js';
import { deleteImageHandler, getImageHandler, postImagesHandler } from '../controllers/image.js';

const router = express.Router();

router.post('/:advertId', authHandler, idHandler, imagesUploadHandler, controllerWrapper(postImagesHandler));
router.get('/:id', idHandler, controllerWrapper(getImageHandler));
router.delete('/:id', authHandler, idHandler, controllerWrapper(deleteImageHandler));

export default router;
