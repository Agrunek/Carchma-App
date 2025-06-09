import appAssert from '../utils/appAssert.js';
import {
  createComment,
  deleteCommentById,
  getCommentById,
  getCommentsByAdvertId,
  getCommentsByUserId,
  reactToCommentById,
  updateCommentById,
} from '../models/comment.js';
import { getAdvertById, updateAdvertScoreById } from '../models/advert.js';
import {
  createInteraction,
  deleteInteractionByUserIdAndTargetIdAndAction as deleteInteraction,
  getInteractionByUserIdAndTargetIdAndAction as getInteraction,
  updateInteractionByUserIdAndTargetIdAndAction as updateInteraction,
} from '../models/interaction.js';
import { calculateScore } from '../utils/reputation.js';
import { FORBIDDEN, INTERNAL_SERVER_ERROR, NOT_FOUND } from '../constants/http.js';
import { COMMENT_REACTION, REACTION_DISLIKE, REACTION_LIKE } from '../constants/interaction.js';

export const uploadComment = async (advertId, userId, status, content) => {
  const advert = await getAdvertById(advertId);
  appAssert(advert, NOT_FOUND, 'Advertisement not found');

  const comment = await createComment(advertId, userId, status, content);

  const updatedComments = await getCommentsByAdvertId(advertId);
  await updateAdvertScoreById(advertId, calculateScore(advert.initialScore, updatedComments));

  return { comment };
};

export const modifyComment = async (commentId, userId, status, content) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  const { userId: ownerId } = comment;
  appAssert(userId.toString() === ownerId.toString(), FORBIDDEN, 'User is not the owner of the advertisement');

  const { updated } = await updateCommentById(commentId, status, content);
  appAssert(updated, INTERNAL_SERVER_ERROR, 'Failed to modify comment');

  const { _id: advertId, initialScore } = await getAdvertById(comment.advertId);

  const updatedComments = await getCommentsByAdvertId(advertId);
  await updateAdvertScoreById(advertId, calculateScore(initialScore, updatedComments));
};

export const removeComment = async (commentId, userId) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  const { userId: ownerId } = comment;
  appAssert(userId.toString() === ownerId.toString(), FORBIDDEN, 'User is not the owner of the advertisement');

  const { deleted } = await deleteCommentById(commentId);
  appAssert(deleted, INTERNAL_SERVER_ERROR, 'Failed to delete comment');

  const { _id: advertId, initialScore } = await getAdvertById(comment.advertId);

  const updatedComments = await getCommentsByAdvertId(advertId);
  await updateAdvertScoreById(advertId, calculateScore(initialScore, updatedComments));
};

export const showComment = async (commentId) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  return { comment };
};

export const showAdvertComments = async (advertId) => {
  const comments = await getCommentsByAdvertId(advertId);

  return { comments };
};

export const showUserComments = async (userId) => {
  const comments = await getCommentsByUserId(userId);

  return { comments };
};

export const reactToComment = async (commentId, userId, value) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  const reaction = await getInteraction(userId, commentId, COMMENT_REACTION);

  if (reaction) {
    const { updated } = await updateInteraction(userId, commentId, COMMENT_REACTION, value);
    appAssert(updated, INTERNAL_SERVER_ERROR, 'Failed to like the comment');

    if (reaction.value !== value) {
      await reactToCommentById(commentId, { like: value === REACTION_LIKE, dislike: value === REACTION_DISLIKE });
    }

    const { _id: advertId, initialScore } = await getAdvertById(comment.advertId);

    const updatedComments = await getCommentsByAdvertId(advertId);
    await updateAdvertScoreById(advertId, calculateScore(initialScore, updatedComments));

    return { created: false, updated: true };
  }

  const interaction = await createInteraction(userId, commentId, COMMENT_REACTION, value);

  if (value === REACTION_LIKE) {
    await reactToCommentById(commentId, { like: true });
  }

  if (value === REACTION_DISLIKE) {
    await reactToCommentById(commentId, { dislike: true });
  }

  const { _id: advertId, initialScore } = await getAdvertById(comment.advertId);

  const updatedComments = await getCommentsByAdvertId(advertId);
  await updateAdvertScoreById(advertId, calculateScore(initialScore, updatedComments));

  delete interaction.createdAt;

  return { created: true, updated: false, reaction: interaction };
};

export const removeCommentReaction = async (commentId, userId) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  const reaction = await getInteraction(userId, commentId, COMMENT_REACTION);
  appAssert(reaction, NOT_FOUND, 'Reaction not found');

  const { value } = reaction;

  if (value === REACTION_LIKE) {
    await reactToCommentById(commentId, { like: false });
  }

  if (value === REACTION_DISLIKE) {
    await reactToCommentById(commentId, { dislike: false });
  }

  const { deleted } = await deleteInteraction(userId, commentId, COMMENT_REACTION);
  appAssert(deleted, INTERNAL_SERVER_ERROR, 'Failed to delete reaction');

  const { _id: advertId, initialScore } = await getAdvertById(comment.advertId);

  const updatedComments = await getCommentsByAdvertId(advertId);
  await updateAdvertScoreById(advertId, calculateScore(initialScore, updatedComments));
};

export const showCommentReaction = async (commentId, userId) => {
  const interaction = accountId ? await getInteraction(userId, commentId, COMMENT_REACTION) : null;

  return { reaction: interaction?.value || null };
};
