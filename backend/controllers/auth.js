import { loginSchema, registerSchema } from '../schemas/auth.js';
import { createAccount, loginUser } from '../services/auth.js';
import { setAuthCookies } from '../utils/cookies.js';
import { CREATED, OK } from '../constants/http.js';

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
