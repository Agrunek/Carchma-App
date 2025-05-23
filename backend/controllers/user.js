import { z } from 'zod';
import appAssert from '../utils/appAssert.js';
import { getUserById } from '../models/user.js';
import { NOT_FOUND, OK } from '../constants/http.js';

const userIdSchema = z.string().length(24);

export const currentProfileHandler = async (req, res) => {
  const userId = userIdSchema.parse(req.userId);

  const user = await getUserById(userId);
  appAssert(user, NOT_FOUND, 'User not found');

  delete user.password;

  return res.status(OK).json(user);
};

export const anyProfileHandler = async (req, res) => {
  const userId = userIdSchema.parse(req.params.id);

  const user = await getUserById(userId);
  appAssert(user, NOT_FOUND, 'User not found');

  delete user.email;
  delete user.password;

  return res.status(OK).json(user);
};
