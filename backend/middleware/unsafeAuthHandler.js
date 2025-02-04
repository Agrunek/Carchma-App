import appAssert from '../utils/appAssert.js';
import { verifyToken } from '../utils/jwt.js';
import { UNAUTHORIZED } from '../constants/http.js';
import { ACCESS_TOKEN } from '../constants/jwt.js';
import { INVALID_ACCESS_TOKEN } from '../constants/appErrorType.js';

/*
  There is a problem with this approach. When access token expires, it behaves like it does not
  exist and you cannot tell that here, because the refresh token is only added to /auth/refresh
  route, so expired access is the same as a no access at all (logged out user...). Can be fixed
  if we remove the routes connected to the refresh and use it all the time which is not ideal...
*/

const unsafeAuthHandler = (req, res, next) => {
  const accessToken = req.cookies[ACCESS_TOKEN];

  if (accessToken) {
    const { payload, error } = verifyToken(accessToken, ACCESS_TOKEN);
    appAssert(payload, UNAUTHORIZED, error, INVALID_ACCESS_TOKEN);

    req.userId = payload.userId;
    req.sessionId = payload.sessionId;
  }

  next();
};

export default unsafeAuthHandler;
