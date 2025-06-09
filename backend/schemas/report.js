import { z } from 'zod';

const mongoIdPattern = z.string().length(24);

export const createSchema = z.object({
  id: mongoIdPattern,
  userId: mongoIdPattern,
  content: z.string().max(1000).optional(),
});

export const searchSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  userId: mongoIdPattern,
});
