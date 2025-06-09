import express from 'express';
import authHandler from '../middleware/authHandler.js';
import controllerWrapper from '../utils/controllerWrapper.js';
import {
  deleteCommentHandler,
  deleteReactionHandler,
  getCommentHandler,
  getCommentsFromAdvertHandler,
  getCommentsFromUserHandler,
  getReactionHandler,
  patchCommentHandler,
  postCommentHandler,
  putReactionHandler,
} from '../controllers/comment.js';

const router = express.Router();

router.post('/:advertId', authHandler, controllerWrapper(postCommentHandler));
router.put('/react/:id', authHandler, controllerWrapper(putReactionHandler));
router.patch('/:id', authHandler, controllerWrapper(patchCommentHandler));
router.get('/:id', controllerWrapper(getCommentHandler));
router.get('/from-advert/:advertId', controllerWrapper(getCommentsFromAdvertHandler));
router.get('/from-user/:userId', controllerWrapper(getCommentsFromUserHandler));
router.get('/react/:id', authHandler, controllerWrapper(getReactionHandler));
router.delete('/:id', authHandler, controllerWrapper(deleteCommentHandler));
router.delete('/react/:id', authHandler, controllerWrapper(deleteReactionHandler));

export default router;
