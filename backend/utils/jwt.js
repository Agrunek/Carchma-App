import jwt from 'jsonwebtoken';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env.js';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/jwt.js';

const accessOptions = {
  secret: JWT_SECRET,
  audience: ['user'],
  expiresIn: '15m',
};

const refreshOptions = {
  secret: JWT_REFRESH_SECRET,
  audience: ['user'],
  expiresIn: '30d',
};

const jwtOptions = {
  [ACCESS_TOKEN]: accessOptions,
  [REFRESH_TOKEN]: refreshOptions,
};

export const signToken = (payload, type) => {
  const { secret, ...options } = jwtOptions[type];
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token, type) => {
  const { secret, audience } = jwtOptions[type];
  try {
    return { payload: jwt.verify(token, secret, { audience: audience }) };
  } catch (error) {
    return { error: error.message };
  }
};
