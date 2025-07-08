import { MongoError } from 'mongodb';
import { MulterError } from 'multer';
import { ZodError } from 'zod';
import AppError from '../utils/AppError.js';
import { clearAuthCookies, REFRESH_PATH } from '../utils/cookies.js';
import { BAD_REQUEST, IM_A_TEAPOT, INTERNAL_SERVER_ERROR } from '../constants/http.js';

const errorHandler = (error, req, res, next) => {
  console.log(`PATH ${req.path}`, error);

  if (req.path === REFRESH_PATH) {
    clearAuthCookies(res);
  }

  if (error instanceof MongoError) {
    return res.status(IM_A_TEAPOT).json({
      message: 'Database shenanigans',
      type: error.code,
    });
  }

  if (error instanceof MulterError) {
    return res.status(BAD_REQUEST).json({
      message: error.message,
      type: error.code,
    });
  }

  if (error instanceof ZodError) {
    return res.status(BAD_REQUEST).json({
      message: 'Provided data does not match the schema',
      errors: error.issues.map((e) => ({ message: e.message, path: e.path.join('.') })),
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      type: error.type,
    });
  }

  return res.status(INTERNAL_SERVER_ERROR).send('Internal server error');
};

export default errorHandler;
