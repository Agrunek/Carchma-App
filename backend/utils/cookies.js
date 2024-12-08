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
  if (accessToken) {
    const accessTokenTimeout = new Date(Date.now() + FIFTEEN_MINUTES);
    const accessTokenCookieOptions = { ...defaultCookieOptions, expires: accessTokenTimeout };
    res.cookie(ACCESS_TOKEN, accessToken, accessTokenCookieOptions);
  }

  if (refreshToken) {
    const refreshTokenTimeout = new Date(Date.now() + ONE_MONTH);
    const refreshTokenCookieOptions = { ...defaultCookieOptions, expires: refreshTokenTimeout, path: REFRESH_PATH };
    res.cookie(REFRESH_TOKEN, refreshToken, refreshTokenCookieOptions);
  }

  return res;
};

export const clearAuthCookies = (res) => {
  return res.clearCookie(ACCESS_TOKEN).clearCookie(REFRESH_TOKEN, { path: REFRESH_PATH });
};
