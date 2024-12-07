import { INTERNAL_SERVER_ERROR } from '../constants/http.js';
import { UNCLASSIFIED } from '../constants/appErrorType.js';

class AppError extends Error {
  constructor(statusCode = INTERNAL_SERVER_ERROR, message = 'Internal server error', type = UNCLASSIFIED) {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
  }
}

export default AppError;
