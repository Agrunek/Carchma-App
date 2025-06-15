import { z } from 'zod';
import { REACTION_DISLIKE, REACTION_LIKE } from '../constants/interaction.js';
import { COMMENT_INFORMATIVE, COMMENT_NEGATIVE, COMMENT_POSITIVE } from '../constants/comment.js';

const statusPattern = z.enum([COMMENT_POSITIVE, COMMENT_INFORMATIVE, COMMENT_NEGATIVE], { message: 'Invalid status' });
const contentPattern = z.string().min(1).max(1000);
const reactionPattern = z.enum([REACTION_LIKE, REACTION_DISLIKE], { message: 'Invalid reaction value' });

export const postCommentSchema = z.object({
  status: statusPattern,
  content: contentPattern,
});

export const putReactionSchema = z.object({
  value: reactionPattern,
});

export const patchCommentSchema = z.object({
  status: statusPattern,
  content: contentPattern,
});
