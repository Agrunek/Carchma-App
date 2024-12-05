import { ZodError } from 'zod';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../constants/http.js';

const errorHandler = (error, req, res, next) => {
  console.log(`PATH ${req.path}`, error);

  if (error instanceof ZodError) {
    return res.status(BAD_REQUEST).json({
      message: 'Provided data does not match the schema',
      errors: error.issues.map((e) => ({
        message: e.message,
        path: e.path.join('.'),
      })),
    });
  }

  return res.status(INTERNAL_SERVER_ERROR).send('Internal server error');
};

export default errorHandler;
