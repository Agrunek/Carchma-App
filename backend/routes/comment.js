import express from 'express';
import authHandler from '../middleware/authHandler.js';
import unsafeAuthHandler from '../middleware/unsafeAuthHandler.js';
import controllerWrapper from '../utils/controllerWrapper.js';
import {
  deleteCommentHandler,
  deleteReactionHandler,
  getCommentHandler,
  getCommentsByAdvertHandler,
  getCommentsByUserHandler,
  patchCommentHandler,
  postCommentHandler,
  putReactionHandler,
} from '../controllers/comment.js';

const router = express.Router();

router.post('/:advertId', authHandler, controllerWrapper(postCommentHandler));
router.put('/:id/react', authHandler, controllerWrapper(putReactionHandler));
router.patch('/:id', authHandler, controllerWrapper(patchCommentHandler));
router.get('/advert/:advertId', unsafeAuthHandler, controllerWrapper(getCommentsByAdvertHandler));
router.get('/user/:userId', unsafeAuthHandler, controllerWrapper(getCommentsByUserHandler));
router.get('/:id', unsafeAuthHandler, controllerWrapper(getCommentHandler));
router.delete('/:id', authHandler, controllerWrapper(deleteCommentHandler));
router.delete('/:id/react', authHandler, controllerWrapper(deleteReactionHandler));

export default router;
