import { z } from 'zod';
import { REACTION_DISLIKE, REACTION_LIKE } from '../constants/interaction.js';

const mongoIdPattern = z.string().length(24);
const contentPattern = z.string().min(1).max(1000);

const createPattern = z.object({
  advertId: mongoIdPattern,
  userId: mongoIdPattern,
  content: contentPattern,
});

const updatePattern = z.object({
  commentId: mongoIdPattern,
  userId: mongoIdPattern,
  content: contentPattern,
});

const deletePattern = z.object({
  commentId: mongoIdPattern,
  userId: mongoIdPattern,
});

const showPattern = z.object({
  commentId: mongoIdPattern,
  accountId: mongoIdPattern.optional(),
});

const showByAdvertPattern = z.object({
  advertId: mongoIdPattern,
  accountId: mongoIdPattern.optional(),
});

const showByUserPattern = z.object({
  userId: mongoIdPattern,
  accountId: mongoIdPattern.optional(),
});

const updateReactionPattern = z.object({
  commentId: mongoIdPattern,
  userId: mongoIdPattern,
  value: z.enum([REACTION_LIKE, REACTION_DISLIKE], { message: 'Invalid reaction value' }),
});

const deleteReactionPattern = z.object({
  commentId: mongoIdPattern,
  userId: mongoIdPattern,
});

export const createSchema = createPattern;

export const updateSchema = updatePattern;

export const deleteSchema = deletePattern;

export const showSchema = showPattern;

export const showByAdvertSchema = showByAdvertPattern;

export const showByUserSchema = showByUserPattern;

export const updateReactionSchema = updateReactionPattern;

export const deleteReactionSchema = deleteReactionPattern;
