import appAssert from '../utils/appAssert.js';
import { loginSchema, registerSchema, verificationCodeSchema } from '../schemas/auth.js';
import { createAccount, killSession, loginUser, refreshAccessToken, verifyEmail } from '../services/auth.js';
import { clearAuthCookies, setAuthCookies } from '../utils/cookies.js';
import { CREATED, OK, UNAUTHORIZED } from '../constants/http.js';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/jwt.js';

export const registerHandler = async (req, res) => {
  const { email, password, agent } = registerSchema.parse({ ...req.body, agent: req.headers['user-agent'] });

  const { user, accessToken, refreshToken } = await createAccount(email, password, agent);

  return setAuthCookies(res, accessToken, refreshToken).status(CREATED).json(user);
};

export const loginHandler = async (req, res) => {
  const { email, password, agent } = loginSchema.parse({ ...req.body, agent: req.headers['user-agent'] });

  const { accessToken, refreshToken } = await loginUser(email, password, agent);

  return setAuthCookies(res, accessToken, refreshToken).status(OK).json({ message: 'Login successful' });
};

export const refreshHandler = async (req, res) => {
  const currentRefreshToken = req.cookies[REFRESH_TOKEN];
  appAssert(currentRefreshToken, UNAUTHORIZED, 'Missing refresh token');

  const { accessToken, refreshToken } = await refreshAccessToken(currentRefreshToken);

  return setAuthCookies(res, accessToken, refreshToken).status(OK).json({ message: 'Access token refreshed' });
};

export const logoutHandler = async (req, res) => {
  const currentAccessToken = req.cookies[ACCESS_TOKEN];

  await killSession(currentAccessToken);

  return clearAuthCookies(res).status(OK).json({ message: 'Logout successful' });
};

export const emailVerificationHandler = async (req, res) => {
  const verificationCode = verificationCodeSchema.parse(req.params.code);

  await verifyEmail(verificationCode);

  return res.status(OK).json({ message: 'Email verified successfully' });
};
