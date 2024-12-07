import assert from 'node:assert';
import AppError from './AppError.js';

const appAssert = (condition, httpStatusCode, message, type) => {
  return assert(condition, new AppError(httpStatusCode, message, type));
};

export default appAssert;
