import { z } from 'zod';

const mongoIdPattern = z.string().length(24);

const userProfilePattern = z.object({
  userId: mongoIdPattern,
});

export const userProfileSchema = userProfilePattern;
