import { z } from 'zod';

const itemId = z.string().min(1).max(100);

const makePattern = z.object({
  makeId: itemId,
});

export const makeSchema = makePattern;
