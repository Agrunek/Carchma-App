import { Buffer } from 'node:buffer';
import { z } from 'zod';
import { ALLOWED_MIME_TYPES } from '../constants/image.js';

const imagePattern = z.object({
  originalname: z.string().min(1).max(100),
  mimetype: z.enum(ALLOWED_MIME_TYPES, { message: 'Invalid MIME type' }),
  buffer: z.instanceof(Buffer),
});

export const postImagesSchema = z.object({
  images: imagePattern.array().nonempty(),
});
