import appAssert from '../utils/appAssert.js';
import { createSession } from '../models/session.js';
import { createUser, getUserByEmail } from '../models/user.js';
import { createVerificationCode } from '../models/verificationCode.js';
import { signToken } from '../utils/jwt.js';
import { compareValues } from '../utils/bcrypt.js';
import { CONFLICT, UNAUTHORIZED } from '../constants/http.js';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/jwt.js';
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

  const accessToken = signToken({ userId, sessionId }, ACCESS_TOKEN);
  const refreshToken = signToken({ sessionId }, REFRESH_TOKEN);

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

  const accessToken = signToken({ userId, sessionId }, ACCESS_TOKEN);
  const refreshToken = signToken({ sessionId }, REFRESH_TOKEN);

  return { user, accessToken, refreshToken };
};
