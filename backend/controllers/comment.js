import { patchCommentSchema, postCommentSchema, putReactionSchema } from '../schemas/comment.js';
import {
  modifyComment,
  reactToComment,
  removeComment,
  removeCommentReaction,
  showAdvertComments,
  showComment,
  showCommentReaction,
  uploadComment,
} from '../services/comment.js';
import { CREATED, OK } from '../constants/http.js';

export const postCommentHandler = async (req, res) => {
  const { status, content } = postCommentSchema.parse(req.body);

  const { comment } = await uploadComment(req.params.advertId, req.userId, status, content);

  return res.status(CREATED).json(comment);
};

export const putReactionHandler = async (req, res) => {
  const { value } = putReactionSchema.parse(req.body);

  const { created, reaction } = await reactToComment(req.params.id, req.userId, value);

  return created
    ? res.status(CREATED).json(reaction)
    : res.status(OK).json({ message: 'Reaction to comment successful' });
};

export const patchCommentHandler = async (req, res) => {
  const { status, content } = patchCommentSchema.parse(req.body);

  await modifyComment(req.params.id, req.userId, status, content);

  return res.status(OK).json({ message: 'Comment update successful' });
};

export const getCommentHandler = async (req, res) => {
  const { comment } = await showComment(req.params.id);

  return res.status(OK).json(comment);
};

export const getCommentsFromAdvertHandler = async (req, res) => {
  const { comments } = await showAdvertComments(req.params.advertId);

  return res.status(OK).json(comments);
};

export const getReactionHandler = async (req, res) => {
  const { reaction } = await showCommentReaction(req.params.id, req.userId);

  return res.status(OK).json(reaction);
};

export const deleteCommentHandler = async (req, res) => {
  await removeComment(req.params.id, req.userId);

  return res.status(OK).json({ message: 'Comment deleted successfully' });
};

export const deleteReactionHandler = async (req, res) => {
  await removeCommentReaction(req.params.id, req.userId);

  return res.status(OK).json({ message: 'Reaction deleted successfully' });
};
