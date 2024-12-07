import { deleteSessionById } from '../models/session.js';
import { loginSchema, registerSchema } from '../schemas/auth.js';
import { createAccount, loginUser } from '../services/auth.js';
import { clearAuthCookies, setAuthCookies } from '../utils/cookies.js';
import { verifyToken } from '../utils/jwt.js';
import { CREATED, OK } from '../constants/http.js';
import { ACCESS_TOKEN } from '../constants/jwt.js';

export const registerHandler = async (req, res) => {
  const { email, password, agent } = registerSchema.parse({
    ...req.body,
    agent: req.headers['user-agent'],
  });

  const { user, accessToken, refreshToken } = await createAccount(email, password, agent);

  return setAuthCookies(res, accessToken, refreshToken).status(CREATED).json(user);
};

export const loginHandler = async (req, res) => {
  const { email, password, agent } = loginSchema.parse({
    ...req.body,
    agent: req.headers['user-agent'],
  });

  const { accessToken, refreshToken } = await loginUser(email, password, agent);

  return setAuthCookies(res, accessToken, refreshToken).status(OK).json({ message: 'Login successful' });
};

export const logoutHandler = async (req, res) => {
  const accessToken = req.cookies[ACCESS_TOKEN];
  const { payload } = verifyToken(accessToken, ACCESS_TOKEN);

  if (payload) {
    await deleteSessionById(payload.sessionId);
  }

  return clearAuthCookies(res).status(OK).json({ message: 'Logout successful' });
};
