import appAssert from '../utils/appAssert.js';
import {
  createComment,
  deleteCommentById,
  getCommentById,
  getCommentsByAdvertId,
  getCommentsByUserId,
  updateCommentById,
} from '../models/comment.js';
import { getAdvertById } from '../models/advert.js';
import {
  createInteraction,
  deleteInteractionByUserIdAndTargetIdAndAction as deleteInteraction,
  getInteractionByUserIdAndTargetIdAndAction as getInteraction,
  updateInteractionByUserIdAndTargetIdAndAction as updateInteraction,
} from '../models/interaction.js';
import { FORBIDDEN, INTERNAL_SERVER_ERROR, NOT_FOUND } from '../constants/http.js';
import { COMMENT_REACTION } from '../constants/interaction.js';

export const uploadComment = async (advertId, userId, content) => {
  const advert = await getAdvertById(advertId);
  appAssert(advert, NOT_FOUND, 'Advertisement not found');

  const comment = await createComment(advertId, userId, content);

  delete comment.createdAt;
  delete comment.updatedAt;

  return { comment };
};

export const modifyComment = async (commentId, userId, content) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  const { userId: ownerId } = comment;
  appAssert(userId.toString() === ownerId.toString(), FORBIDDEN, 'User is not the owner of the advertisement');

  const { updated } = await updateCommentById(commentId, content);
  appAssert(updated, INTERNAL_SERVER_ERROR, 'Failed to modify comment');
};

export const removeComment = async (commentId, userId) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  const { userId: ownerId } = comment;
  appAssert(userId.toString() === ownerId.toString(), FORBIDDEN, 'User is not the owner of the advertisement');

  const { deleted } = await deleteCommentById(commentId);
  appAssert(deleted, INTERNAL_SERVER_ERROR, 'Failed to delete comment');
};

export const showComment = async (commentId) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  delete comment.createdAt;
  delete comment.updatedAt;

  return { comment };
};

export const showAdvertComments = async (advertId) => {
  const comments = await getCommentsByAdvertId(advertId);

  comments.forEach((comment) => {
    delete comment.createdAt;
    delete comment.updatedAt;
  });

  return { comments };
};

export const showUserComments = async (userId) => {
  const comments = await getCommentsByUserId(userId);

  comments.forEach((comment) => {
    delete comment.createdAt;
    delete comment.updatedAt;
  });

  return { comments };
};

export const reactToComment = async (commentId, userId, value) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  const reaction = await getInteraction(userId, commentId, COMMENT_REACTION);

  if (reaction) {
    const { updated } = await updateInteraction(userId, commentId, COMMENT_REACTION, value);
    appAssert(updated, INTERNAL_SERVER_ERROR, 'Failed to like the comment');

    return { created: false, updated: true };
  }

  const interaction = await createInteraction(userId, commentId, COMMENT_REACTION, value);

  delete interaction.createdAt;
  delete interaction.updatedAt;

  return { created: true, updated: false, reaction: interaction };
};

export const removeCommentReaction = async (commentId, userId) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  const { deleted } = await deleteInteraction(userId, commentId, COMMENT_REACTION);
  appAssert(deleted, INTERNAL_SERVER_ERROR, 'Failed to delete reaction');
};
