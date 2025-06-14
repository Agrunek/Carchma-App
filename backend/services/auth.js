import appAssert from '../utils/appAssert.js';
import {
  createSession,
  deleteAllSessionsByUserId,
  deleteSessionById,
  getSessionById,
  resetSessionById,
} from '../models/session.js';
import { createUser, getUserByEmail, resetUserPasswordById, verifyUserById } from '../models/user.js';
import {
  countVerificationCodesByUserIdAndTypeAndOffset,
  createVerificationCode,
  deleteVerificationCodeById,
  getVerificationCodeBySignature,
} from '../models/verificationCode.js';
import { sendVerificationMail } from '../utils/mail.js';
import { signToken, verifyToken } from '../utils/jwt.js';
import { compareValues } from '../utils/bcrypt.js';
import { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND, TOO_MANY_REQUESTS, UNAUTHORIZED } from '../constants/http.js';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/jwt.js';
import { EMAIL_VERIFICATION, PASSWORD_RESET } from '../constants/verificationType.js';
import { FIVE_MINUTES, ONE_DAY } from '../constants/time.js';

export const createAccount = async (name, email, password, agent) => {
  const account = await getUserByEmail(email);
  appAssert(!account, CONFLICT, 'Email already in use');

  const user = await createUser(name, email, password);
  const { _id: userId, email: userEmail } = user;

  delete user.password;

  const { signature } = await createVerificationCode(userId, EMAIL_VERIFICATION);

  await sendVerificationMail(userEmail, EMAIL_VERIFICATION, signature);

  const { _id: sessionId } = await createSession(userId, agent);

  const accessToken = signToken({ userId, sessionId }, ACCESS_TOKEN);
  const refreshToken = signToken({ sessionId }, REFRESH_TOKEN);

  return { user, accessToken, refreshToken };
};

export const loginUser = async (email, password, agent) => {
  const user = await getUserByEmail(email);
  appAssert(user, UNAUTHORIZED, 'Invalid email or password');

  const { _id: userId, password: userPassword } = user;

  const isPasswordValid = await compareValues(password, userPassword);
  appAssert(isPasswordValid, UNAUTHORIZED, 'Invalid email or password');

  const { _id: sessionId } = await createSession(userId, agent);

  const accessToken = signToken({ userId, sessionId }, ACCESS_TOKEN);
  const refreshToken = signToken({ sessionId }, REFRESH_TOKEN);

  return { accessToken, refreshToken };
};

export const refreshAccessToken = async (currentRefreshToken) => {
  appAssert(currentRefreshToken, UNAUTHORIZED, 'Missing refresh token');

  const { payload } = verifyToken(currentRefreshToken, REFRESH_TOKEN);
  appAssert(payload, UNAUTHORIZED, 'Invalid refresh token');

  const session = await getSessionById(payload.sessionId);
  appAssert(session, UNAUTHORIZED, 'Session expired');

  const { _id: sessionId, userId, expiresAt } = session;
  const sessionTTL = expiresAt.getTime() - Date.now();
  appAssert(sessionTTL > 0, UNAUTHORIZED, 'Session expired');

  const accessToken = signToken({ userId, sessionId }, ACCESS_TOKEN);

  if (sessionTTL > ONE_DAY) {
    return { accessToken };
  }

  const { updated } = await resetSessionById(sessionId);

  if (!updated) {
    return { accessToken };
  }

  const refreshToken = signToken({ sessionId }, REFRESH_TOKEN);

  return { accessToken, refreshToken };
};

export const killSession = async (currentAccessToken) => {
  const { payload } = verifyToken(currentAccessToken, ACCESS_TOKEN);

  if (payload) {
    await deleteSessionById(payload.sessionId);
  }
};

export const verifyEmail = async (signature) => {
  const verificationCode = await getVerificationCodeBySignature(signature);
  appAssert(verificationCode, NOT_FOUND, 'Invalid verification code');

  const { _id: verificationCodeId, userId, type, expiresAt } = verificationCode;
  appAssert(type === EMAIL_VERIFICATION, NOT_FOUND, 'Invalid verification code');

  const verificationCodeTTL = expiresAt.getTime() - Date.now();
  appAssert(verificationCodeTTL > 0, NOT_FOUND, 'Verification code expired');

  const { updated } = await verifyUserById(userId);
  appAssert(updated, INTERNAL_SERVER_ERROR, 'Failed to verify email');

  await deleteVerificationCodeById(verificationCodeId);
};

export const sendPasswordResetMail = async (userEmail) => {
  const user = await getUserByEmail(userEmail);
  appAssert(user, NOT_FOUND, 'User not found');

  const { _id: userId } = user;

  const count = await countVerificationCodesByUserIdAndTypeAndOffset(userId, PASSWORD_RESET, FIVE_MINUTES);
  appAssert(count <= 1, TOO_MANY_REQUESTS, 'Too many requests, please try again later');

  const { signature } = await createVerificationCode(userId, PASSWORD_RESET);

  await sendVerificationMail(userEmail, PASSWORD_RESET, signature);
};

export const resetPassword = async (password, signature) => {
  const verificationCode = await getVerificationCodeBySignature(signature);
  appAssert(verificationCode, NOT_FOUND, 'Invalid verification code');

  const { _id: verificationCodeId, userId, type, expiresAt } = verificationCode;
  appAssert(type === PASSWORD_RESET, NOT_FOUND, 'Invalid verification code');

  const verificationCodeTTL = expiresAt.getTime() - Date.now();
  appAssert(verificationCodeTTL > 0, NOT_FOUND, 'Verification code expired');

  const { updated } = await resetUserPasswordById(userId, password);
  appAssert(updated, INTERNAL_SERVER_ERROR, 'Failed to reset password');

  await deleteVerificationCodeById(verificationCodeId);

  await deleteAllSessionsByUserId(userId);
};
