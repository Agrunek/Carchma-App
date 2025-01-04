import { z } from 'zod';

const mongoIdPattern = z.string().length(24);
const imagePattern = z.any();

const createPattern = z.object({
  advertId: mongoIdPattern,
  userId: mongoIdPattern,
  images: imagePattern.array().nonempty(),
});

const downloadPattern = z.object({
  imageId: mongoIdPattern,
});

const deletePattern = z.object({
  imageId: mongoIdPattern,
  userId: mongoIdPattern,
});

export const createSchema = createPattern;

export const downloadSchema = downloadPattern;

export const deleteSchema = deletePattern;
