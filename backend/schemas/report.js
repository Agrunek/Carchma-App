import { z } from 'zod';

const contentPattern = z.string().min(1).max(1000);
const pagePattern = z.coerce.number().int().positive();

export const postReportSchema = z.object({
  content: contentPattern,
});

export const getReportsSchema = z.object({
  page: pagePattern.optional(),
});
