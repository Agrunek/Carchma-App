import { z } from 'zod';

const mongoIdPattern = z.string().length(24);

export const userIdSchema = mongoIdPattern;
