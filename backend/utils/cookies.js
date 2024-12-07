import { NODE_ENV } from '../constants/env.js';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/jwt.js';
import { FIFTEEN_MINUTES, ONE_MONTH } from '../constants/time.js';

export const REFRESH_PATH = '/auth/refresh';

const defaultCookieOptions = {
  sameSite: 'strict',
  httpOnly: true,
  secure: NODE_ENV !== 'development',
};

export const setAuthCookies = (res, accessToken, refreshToken) => {
  const accessTokenTimeout = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenTimeout = new Date(Date.now() + ONE_MONTH);

  const accessTokenCookieOptions = { ...defaultCookieOptions, expires: accessTokenTimeout };
  const refreshTokenCookieOptions = { ...defaultCookieOptions, expires: refreshTokenTimeout, path: REFRESH_PATH };

  return res
    .cookie(ACCESS_TOKEN, accessToken, accessTokenCookieOptions)
    .cookie(REFRESH_TOKEN, refreshToken, refreshTokenCookieOptions);
};

export const clearAuthCookies = (res) => {
  return res.clearCookie(ACCESS_TOKEN).clearCookie(REFRESH_TOKEN, { path: REFRESH_PATH });
};
