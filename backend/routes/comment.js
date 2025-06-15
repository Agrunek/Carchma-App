import express from 'express';
import authHandler from '../middleware/authHandler.js';
import idHandler from '../middleware/idHandler.js';
import controllerWrapper from '../utils/controllerWrapper.js';
import {
  deleteCommentHandler,
  deleteReactionHandler,
  getCommentHandler,
  getCommentsFromAdvertHandler,
  getReactionHandler,
  patchCommentHandler,
  postCommentHandler,
  putReactionHandler,
} from '../controllers/comment.js';

const router = express.Router();

router.post('/:advertId', authHandler, idHandler, controllerWrapper(postCommentHandler));
router.put('/react/:id', authHandler, idHandler, controllerWrapper(putReactionHandler));
router.patch('/:id', authHandler, idHandler, controllerWrapper(patchCommentHandler));
router.get('/:id', idHandler, controllerWrapper(getCommentHandler));
router.get('/from-advert/:advertId', idHandler, controllerWrapper(getCommentsFromAdvertHandler));
router.get('/react/:id', authHandler, idHandler, controllerWrapper(getReactionHandler));
router.delete('/:id', authHandler, idHandler, controllerWrapper(deleteCommentHandler));
router.delete('/react/:id', authHandler, idHandler, controllerWrapper(deleteReactionHandler));

export default router;
