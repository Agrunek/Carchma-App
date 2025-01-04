import express from 'express';
import authHandler from '../middleware/authHandler.js';
import imagesUploadHandler from '../middleware/imagesUploadHandler.js';
import controllerWrapper from '../utils/controllerWrapper.js';
import { deleteImageHandler, getImageHandler, postImagesHandler } from '../controllers/image.js';

const router = express.Router();

router.post('/:advertId', authHandler, imagesUploadHandler, controllerWrapper(postImagesHandler));
router.get('/:id', controllerWrapper(getImageHandler));
router.delete('/:id', authHandler, controllerWrapper(deleteImageHandler));

export default router;
