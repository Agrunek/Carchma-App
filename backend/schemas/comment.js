import { z } from 'zod';
import { REACTION_DISLIKE, REACTION_LIKE } from '../constants/interaction.js';
import { COMMENT_INFORMATIVE, COMMENT_NEGATIVE, COMMENT_POSITIVE } from '../constants/comment.js';

const mongoIdPattern = z.string().length(24);
const statusPattern = z.enum([COMMENT_POSITIVE, COMMENT_INFORMATIVE, COMMENT_NEGATIVE], { message: 'Invalid status' });
const contentPattern = z.string().min(1).max(1000);
const reactionPattern = z.enum([REACTION_LIKE, REACTION_DISLIKE], { message: 'Invalid reaction value' });

export const createSchema = z.object({
  advertId: mongoIdPattern,
  userId: mongoIdPattern,
  status: statusPattern,
  content: contentPattern,
});

export const updateSchema = z.object({
  commentId: mongoIdPattern,
  userId: mongoIdPattern,
  status: statusPattern,
  content: contentPattern,
});

export const deleteSchema = z.object({
  commentId: mongoIdPattern,
  userId: mongoIdPattern,
});

export const showSchema = z.object({
  commentId: mongoIdPattern,
});

export const showByAdvertSchema = z.object({
  advertId: mongoIdPattern,
});

export const showByUserSchema = z.object({
  userId: mongoIdPattern,
});

export const updateReactionSchema = z.object({
  commentId: mongoIdPattern,
  userId: mongoIdPattern,
  value: reactionPattern,
});

export const deleteReactionSchema = z.object({
  commentId: mongoIdPattern,
  userId: mongoIdPattern,
});

export const showReactionSchema = z.object({
  commentId: mongoIdPattern,
  userId: mongoIdPattern,
});
