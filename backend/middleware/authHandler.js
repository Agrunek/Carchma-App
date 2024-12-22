import appAssert from '../utils/appAssert.js';
import { verifyToken } from '../utils/jwt.js';
import { UNAUTHORIZED } from '../constants/http.js';
import { ACCESS_TOKEN } from '../constants/jwt.js';
import { INVALID_ACCESS_TOKEN } from '../constants/appErrorType.js';

const authHandler = (req, res, next) => {
  const accessToken = req.cookies[ACCESS_TOKEN];
  appAssert(accessToken, UNAUTHORIZED, 'Not authorized', INVALID_ACCESS_TOKEN);

  const { payload, error } = verifyToken(accessToken, ACCESS_TOKEN);
  appAssert(payload, UNAUTHORIZED, error, INVALID_ACCESS_TOKEN);

  req.userId = payload.userId;
  req.sessionId = payload.sessionId;

  next();
};

export default authHandler;
