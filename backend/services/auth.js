import jwt from 'jsonwebtoken';
import { createSession } from '../models/session.js';
import { createUser, userEmailExists } from '../models/user.js';
import { createVerificationCode } from '../models/verificationCode.js';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env.js';
import { EMAIL_VERIFICATION } from '../constants/verificationType.js';

export const createAccount = async (email, password, agent) => {
  if (await userEmailExists(email)) {
    throw new Error('Email already in use');
  }

  const user = await createUser(email, password);
  const userId = user._id;

  await createVerificationCode(userId, EMAIL_VERIFICATION);

  // Send email

  const { _id: sessionId } = await createSession(userId, agent);

  const accessToken = jwt.sign({ userId, sessionId }, JWT_SECRET, { audience: ['user'], expiresIn: '15m' });
  const refreshToken = jwt.sign({ sessionId }, JWT_REFRESH_SECRET, { audience: ['user'], expiresIn: '30d' });

  return { user, accessToken, refreshToken };
};
