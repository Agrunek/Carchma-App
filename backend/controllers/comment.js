import {
  createSchema,
  deleteReactionSchema,
  deleteSchema,
  showByAdvertSchema,
  showByUserSchema,
  showSchema,
  updateReactionSchema,
  updateSchema,
} from '../schemas/comment.js';
import {
  uploadComment,
  modifyComment,
  removeComment,
  showComment,
  showAdvertComments,
  showUserComments,
  removeCommentReaction,
  reactToComment,
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

export const patchCommentHandler = async (req, res) => {
  const { commentId, userId, status, content } = updateSchema.parse({
    ...req.body,
    userId: req.userId,
    commentId: req.params.id,
  });

  await modifyComment(commentId, userId, status, content);

  return res.status(OK).json({ message: 'Comment update successful' });
};

export const getCommentsByAdvertHandler = async (req, res) => {
  const { advertId, accountId } = showByAdvertSchema.parse({ advertId: req.params.advertId, accountId: req.userId });

  const { comments } = await showAdvertComments(advertId, accountId);

  return res.status(OK).json(comments);
};

export const getCommentsByUserHandler = async (req, res) => {
  const { userId, accountId } = showByUserSchema.parse({ userId: req.params.userId, accountId: req.userId });

  const { comments } = await showUserComments(userId, accountId);

  return res.status(OK).json(comments);
};

export const getCommentHandler = async (req, res) => {
  const { commentId, accountId } = showSchema.parse({ commentId: req.params.id, accountId: req.userId });

  const { comment } = await showComment(commentId, accountId);

  return res.status(OK).json(comment);
};

export const deleteCommentHandler = async (req, res) => {
  const { commentId, userId } = deleteSchema.parse({ commentId: req.params.id, userId: req.userId });

  await removeComment(commentId, userId);

  return res.status(OK).json({ message: 'Comment deleted successfully' });
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

export const deleteReactionHandler = async (req, res) => {
  const { commentId, userId } = deleteReactionSchema.parse({ commentId: req.params.id, userId: req.userId });

  await removeCommentReaction(commentId, userId);

  return res.status(OK).json({ message: 'Reaction deleted successfully' });
};
