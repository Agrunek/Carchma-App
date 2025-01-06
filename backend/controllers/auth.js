import {
  emailVerificationSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from '../schemas/auth.js';
import {
  createAccount,
  killSession,
  loginUser,
  refreshAccessToken,
  resetPassword,
  sendPasswordResetMail,
  verifyEmail,
} from '../services/auth.js';
import { clearAuthCookies, setAuthCookies } from '../utils/cookies.js';
import { CREATED, OK } from '../constants/http.js';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/jwt.js';

export const registerHandler = async (req, res) => {
  const { name, email, password, agent } = registerSchema.parse({ ...req.body, agent: req.headers['user-agent'] });

  const { user, accessToken, refreshToken } = await createAccount(name, email, password, agent);

  return setAuthCookies(res, accessToken, refreshToken).status(CREATED).json(user);
};

export const loginHandler = async (req, res) => {
  const { email, password, agent } = loginSchema.parse({ ...req.body, agent: req.headers['user-agent'] });

  const { accessToken, refreshToken } = await loginUser(email, password, agent);

  return setAuthCookies(res, accessToken, refreshToken).status(OK).json({ message: 'Login successful' });
};

export const refreshHandler = async (req, res) => {
  const currentRefreshToken = req.cookies[REFRESH_TOKEN];

  const { accessToken, refreshToken } = await refreshAccessToken(currentRefreshToken);

  return setAuthCookies(res, accessToken, refreshToken).status(OK).json({ message: 'Access token refreshed' });
};

export const logoutHandler = async (req, res) => {
  const currentAccessToken = req.cookies[ACCESS_TOKEN];

  await killSession(currentAccessToken);

  return clearAuthCookies(res).status(OK).json({ message: 'Logout successful' });
};

export const emailVerificationHandler = async (req, res) => {
  const { verificationCode } = emailVerificationSchema.parse({ verificationCode: req.params.code });

  await verifyEmail(verificationCode);

  return res.status(OK).json({ message: 'Email verified successfully' });
};

export const forgotPasswordHandler = async (req, res) => {
  const { email } = forgotPasswordSchema.parse(req.body);

  await sendPasswordResetMail(email);

  return res.status(OK).json({ message: 'Password reset email sent' });
};

export const resetPasswordHandler = async (req, res) => {
  const { password, verificationCode } = resetPasswordSchema.parse({ ...req.body, verificationCode: req.params.code });

  await resetPassword(password, verificationCode);

  return clearAuthCookies(res).status(OK).json({ message: 'Password reset successful' });
};
