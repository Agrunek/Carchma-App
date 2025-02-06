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

  delete comment.createdAt;
  delete comment.updatedAt;

  comment.reaction = null;

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

export const showComment = async (commentId, accountId) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  delete comment.createdAt;
  delete comment.updatedAt;

  const interaction = accountId ? await getInteraction(accountId, commentId, COMMENT_REACTION) : null;
  comment.reaction = interaction?.value || null;

  return { comment };
};

export const showAdvertComments = async (advertId, accountId) => {
  const comments = await getCommentsByAdvertId(advertId);

  for (const comment of comments) {
    delete comment.createdAt;
    delete comment.updatedAt;

    const interaction = accountId ? await getInteraction(accountId, comment._id, COMMENT_REACTION) : null;
    comment.reaction = interaction?.value || null;
  }

  return { comments };
};

export const showUserComments = async (userId, accountId) => {
  const comments = await getCommentsByUserId(userId);

  for (const comment of comments) {
    delete comment.createdAt;
    delete comment.updatedAt;

    const interaction = accountId ? await getInteraction(accountId, comment._id, COMMENT_REACTION) : null;
    comment.reaction = interaction?.value || null;
  }

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
      await reactToCommentById(commentId, value === REACTION_LIKE ? 1 : -1, value === REACTION_DISLIKE ? 1 : -1);
    }

    const { _id: advertId, initialScore } = await getAdvertById(comment.advertId);

    const updatedComments = await getCommentsByAdvertId(advertId);
    await updateAdvertScoreById(advertId, calculateScore(initialScore, updatedComments));

    return { created: false, updated: true };
  }

  const interaction = await createInteraction(userId, commentId, COMMENT_REACTION, value);

  await reactToCommentById(commentId, value === REACTION_LIKE ? 1 : 0, value === REACTION_DISLIKE ? 1 : 0);

  const { _id: advertId, initialScore } = await getAdvertById(comment.advertId);

  const updatedComments = await getCommentsByAdvertId(advertId);
  await updateAdvertScoreById(advertId, calculateScore(initialScore, updatedComments));

  delete interaction.createdAt;
  delete interaction.updatedAt;

  return { created: true, updated: false, reaction: interaction };
};

export const removeCommentReaction = async (commentId, userId) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  const reaction = await getInteraction(userId, commentId, COMMENT_REACTION);
  appAssert(reaction, NOT_FOUND, 'Reaction not found');

  const { value } = reaction;
  await reactToCommentById(commentId, value === REACTION_LIKE ? -1 : 0, value === REACTION_DISLIKE ? -1 : 0);

  const { deleted } = await deleteInteraction(userId, commentId, COMMENT_REACTION);
  appAssert(deleted, INTERNAL_SERVER_ERROR, 'Failed to delete reaction');

  const { _id: advertId, initialScore } = await getAdvertById(comment.advertId);

  const updatedComments = await getCommentsByAdvertId(advertId);
  await updateAdvertScoreById(advertId, calculateScore(initialScore, updatedComments));
};
