import { z } from 'zod';

export const schemaWrapper = (schema: z.ZodTypeAny, path: string, message: string) => {
  return schema.catch(() => {
    throw new z.ZodError([{ code: 'custom', path: [path], message: message }]);
  });
};
