import express from 'express';
import authHandler from '../middleware/authHandler.js';
import controllerWrapper from '../utils/controllerWrapper.js';
import {
  deleteCommentHandler,
  getCommentHandler,
  getCommentsByAdvertHandler,
  getCommentsByUserHandler,
  patchCommentHandler,
  postCommentHandler,
} from '../controllers/comment.js';

const router = express.Router();

router.post('/:advertId', authHandler, controllerWrapper(postCommentHandler));
router.patch('/:id', authHandler, controllerWrapper(patchCommentHandler));
router.get('/advert/:advertId', controllerWrapper(getCommentsByAdvertHandler));
router.get('/user/:userId', controllerWrapper(getCommentsByUserHandler));
router.get('/:id', controllerWrapper(getCommentHandler));
router.delete('/:id', authHandler, controllerWrapper(deleteCommentHandler));

export default router;
