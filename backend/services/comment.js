import appAssert from '../utils/appAssert.js';
import {
  createComment,
  deleteCommentById,
  getCommentById,
  getCommentsByAdvertId,
  reactToCommentById,
  updateCommentById,
} from '../models/comment.js';
import { getAdvertById, updateAdvertScoreById } from '../models/advert.js';
import {
  createInteraction,
  deleteInteractionByUserIdAndTargetIdAndAction,
  getInteractionByUserIdAndTargetIdAndAction,
  updateInteractionByUserIdAndTargetIdAndAction,
} from '../models/interaction.js';
import { calculateScore } from '../utils/reputation.js';
import { FORBIDDEN, INTERNAL_SERVER_ERROR, NOT_FOUND } from '../constants/http.js';
import { COMMENT_REACTION, REACTION_DISLIKE, REACTION_LIKE } from '../constants/interaction.js';

export const uploadComment = async (advertId, userId, status, content) => {
  const advert = await getAdvertById(advertId);
  appAssert(advert, NOT_FOUND, 'Advertisement not found');

  const { initialScore } = advert;
  const comment = await createComment(advertId, userId, status, content);

  const updatedComments = await getCommentsByAdvertId(advertId);
  await updateAdvertScoreById(advertId, calculateScore(initialScore, updatedComments));

  return { comment };
};

export const modifyComment = async (commentId, userId, status, content) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  const { advertId, userId: ownerId } = comment;
  appAssert(userId.toString() === ownerId.toString(), FORBIDDEN, 'User is not the owner of the comment');

  const { updated } = await updateCommentById(commentId, status, content);
  appAssert(updated, INTERNAL_SERVER_ERROR, 'Failed to modify comment');

  const { initialScore } = await getAdvertById(advertId);

  const updatedComments = await getCommentsByAdvertId(advertId);
  await updateAdvertScoreById(advertId, calculateScore(initialScore, updatedComments));
};

export const removeComment = async (commentId, userId) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  const { advertId, userId: ownerId } = comment;
  appAssert(userId.toString() === ownerId.toString(), FORBIDDEN, 'User is not the owner of the comment');

  const { deleted } = await deleteCommentById(commentId);
  appAssert(deleted, INTERNAL_SERVER_ERROR, 'Failed to delete comment');

  const { initialScore } = await getAdvertById(advertId);

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

export const reactToComment = async (commentId, userId, value) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  const { advertId } = comment;
  const current = await getInteractionByUserIdAndTargetIdAndAction(userId, commentId, COMMENT_REACTION);

  let interaction = null;

  if (current) {
    const { updated } = await updateInteractionByUserIdAndTargetIdAndAction(userId, commentId, COMMENT_REACTION, value);
    appAssert(updated, INTERNAL_SERVER_ERROR, 'Failed to react to the comment');

    const { value: currentValue } = current;
    if (currentValue !== value) {
      await reactToCommentById(commentId, { like: value === REACTION_LIKE, dislike: value === REACTION_DISLIKE });
    }
  } else {
    interaction = await createInteraction(userId, commentId, COMMENT_REACTION, value);

    if (value === REACTION_LIKE) {
      await reactToCommentById(commentId, { like: true });
    }

    if (value === REACTION_DISLIKE) {
      await reactToCommentById(commentId, { dislike: true });
    }
  }

  const { initialScore } = await getAdvertById(advertId);

  const updatedComments = await getCommentsByAdvertId(advertId);
  await updateAdvertScoreById(advertId, calculateScore(initialScore, updatedComments));

  return { created: !current, updated: !!current, reaction: interaction };
};

export const removeCommentReaction = async (commentId, userId) => {
  const comment = await getCommentById(commentId);
  appAssert(comment, NOT_FOUND, 'Comment not found');

  const interaction = await getInteractionByUserIdAndTargetIdAndAction(userId, commentId, COMMENT_REACTION);
  appAssert(interaction, NOT_FOUND, 'Reaction not found');

  const { advertId } = comment;
  const { value } = interaction;

  if (value === REACTION_LIKE) {
    await reactToCommentById(commentId, { like: false });
  }

  if (value === REACTION_DISLIKE) {
    await reactToCommentById(commentId, { dislike: false });
  }

  const { deleted } = await deleteInteractionByUserIdAndTargetIdAndAction(userId, commentId, COMMENT_REACTION);
  appAssert(deleted, INTERNAL_SERVER_ERROR, 'Failed to delete reaction');

  const { initialScore } = await getAdvertById(advertId);

  const updatedComments = await getCommentsByAdvertId(advertId);
  await updateAdvertScoreById(advertId, calculateScore(initialScore, updatedComments));
};

export const showCommentReaction = async (commentId, userId) => {
  const interaction = await getInteractionByUserIdAndTargetIdAndAction(userId, commentId, COMMENT_REACTION);

  return { reaction: interaction?.value || null };
};
