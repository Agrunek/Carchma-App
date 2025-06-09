import {
  createSchema,
  deleteReactionSchema,
  deleteSchema,
  showByAdvertSchema,
  showByUserSchema,
  showReactionSchema,
  showSchema,
  updateReactionSchema,
  updateSchema,
} from '../schemas/comment.js';
import {
  modifyComment,
  reactToComment,
  removeComment,
  removeCommentReaction,
  showAdvertComments,
  showComment,
  showCommentReaction,
  showUserComments,
  uploadComment,
} from '../services/comment.js';
import { CREATED, OK } from '../constants/http.js';

export const postCommentHandler = async (req, res) => {
  const { advertId, userId, status, content } = createSchema.parse({
    ...req.body,
    userId: req.userId,
    advertId: req.params.advertId,
  });

  const { comment } = await uploadComment(advertId, userId, status, content);

  return res.status(CREATED).json(comment);
};

export const putReactionHandler = async (req, res) => {
  const { commentId, userId, value } = updateReactionSchema.parse({
    ...req.body,
    commentId: req.params.id,
    userId: req.userId,
  });

  const { created, reaction } = await reactToComment(commentId, userId, value);

  return created
    ? res.status(CREATED).json(reaction)
    : res.status(OK).json({ message: 'Reaction to comment successful' });
};

export const patchCommentHandler = async (req, res) => {
  const { commentId, userId, status, content } = updateSchema.parse({
    ...req.body,
    userId: req.userId,
    commentId: req.params.id,
  });

  await modifyComment(commentId, userId, status, content);

  return res.status(OK).json({ message: 'Comment update successful' });
};

export const getCommentHandler = async (req, res) => {
  const { commentId } = showSchema.parse({ commentId: req.params.id });

  const { comment } = await showComment(commentId);

  return res.status(OK).json(comment);
};

export const getCommentsFromAdvertHandler = async (req, res) => {
  const { advertId } = showByAdvertSchema.parse({ advertId: req.params.advertId });

  const { comments } = await showAdvertComments(advertId);

  return res.status(OK).json(comments);
};

export const getCommentsFromUserHandler = async (req, res) => {
  const { userId } = showByUserSchema.parse({ userId: req.params.userId });

  const { comments } = await showUserComments(userId);

  return res.status(OK).json(comments);
};

export const getReactionHandler = async (req, res) => {
  const { commentId, userId } = showReactionSchema.parse({ commentId: req.params.id, userId: req.userId });

  const { reaction } = await showCommentReaction(commentId, userId);

  return res.status(OK).json(reaction);
};

export const deleteCommentHandler = async (req, res) => {
  const { commentId, userId } = deleteSchema.parse({ commentId: req.params.id, userId: req.userId });

  await removeComment(commentId, userId);

  return res.status(OK).json({ message: 'Comment deleted successfully' });
};

export const deleteReactionHandler = async (req, res) => {
  const { commentId, userId } = deleteReactionSchema.parse({ commentId: req.params.id, userId: req.userId });

  await removeCommentReaction(commentId, userId);

  return res.status(OK).json({ message: 'Reaction deleted successfully' });
};
