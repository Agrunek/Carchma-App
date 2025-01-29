import { z } from 'zod';

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
});

const showByAdvertPattern = z.object({
  advertId: mongoIdPattern,
});

const showByUserPattern = z.object({
  userId: mongoIdPattern,
});

export const createSchema = createPattern;

export const updateSchema = updatePattern;

export const deleteSchema = deletePattern;

export const showSchema = showPattern;

export const showByAdvertSchema = showByAdvertPattern;

export const showByUserSchema = showByUserPattern;
