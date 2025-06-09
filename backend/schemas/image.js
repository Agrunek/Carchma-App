import { z } from 'zod';

const mongoIdPattern = z.string().length(24);
const imagePattern = z.any();

export const createSchema = z.object({
  advertId: mongoIdPattern,
  userId: mongoIdPattern,
  images: imagePattern.array().nonempty(),
});

export const downloadSchema = z.object({
  imageId: mongoIdPattern,
});

export const deleteSchema = z.object({
  imageId: mongoIdPattern,
  userId: mongoIdPattern,
});
