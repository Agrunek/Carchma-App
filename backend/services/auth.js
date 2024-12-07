import jwt from 'jsonwebtoken';
import appAssert from '../utils/appAssert.js';
import { createSession } from '../models/session.js';
import { createUser, getUserByEmail } from '../models/user.js';
import { createVerificationCode } from '../models/verificationCode.js';
import { compareValues } from '../utils/bcrypt.js';
import { CONFLICT, UNAUTHORIZED } from '../constants/http.js';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env.js';
import { EMAIL_VERIFICATION } from '../constants/verificationType.js';

export const createAccount = async (email, password, agent) => {
  const account = await getUserByEmail(email);
  appAssert(!account, CONFLICT, 'Email already in use');

  const user = await createUser(email, password);
  const userId = user._id;

  /* Prevent return of the generated password: */
  delete user.password;

  await createVerificationCode(userId, EMAIL_VERIFICATION);

  // Send email

  const { _id: sessionId } = await createSession(userId, agent);

  const accessToken = jwt.sign({ userId, sessionId }, JWT_SECRET, { audience: ['user'], expiresIn: '15m' });
  const refreshToken = jwt.sign({ sessionId }, JWT_REFRESH_SECRET, { audience: ['user'], expiresIn: '30d' });

  return { user, accessToken, refreshToken };
};

export const loginUser = async (email, password, agent) => {
  const user = await getUserByEmail(email);
  appAssert(user, UNAUTHORIZED, 'Invalid email or password');

  const isPasswordValid = await compareValues(password, user.password);
  appAssert(isPasswordValid, UNAUTHORIZED, 'Invalid email or password');

  const userId = user._id;

  /* Prevent return of the generated password: */
  delete user.password;

  const { _id: sessionId } = await createSession(userId, agent);

  const accessToken = jwt.sign({ userId, sessionId }, JWT_SECRET, { audience: ['user'], expiresIn: '15m' });
  const refreshToken = jwt.sign({ sessionId }, JWT_REFRESH_SECRET, { audience: ['user'], expiresIn: '30d' });

  return { user, accessToken, refreshToken };
};
