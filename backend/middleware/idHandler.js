import { z } from 'zod';

const mongoIdPattern = z.string().regex(/^[a-f\d]{24}$/i, { message: 'Invalid resource ID' });

const paramsSchema = z.object({}).catchall(mongoIdPattern);

const idHandler = (req, res, next) => {
  paramsSchema.parse(Object.fromEntries(Object.entries(req.params).filter(([k]) => /id/i.test(k))));

  next();
};

export default idHandler;
