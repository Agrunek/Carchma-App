import appAssert from '../utils/appAssert.js';
import { getUserById } from '../models/user.js';
import { NOT_FOUND, OK } from '../constants/http.js';

export const getCurrentProfileHandler = async (req, res) => {
  const user = await getUserById(req.userId);

  delete user.password;

  return res.status(OK).json(user);
};

export const getAnyProfileHandler = async (req, res) => {
  const user = await getUserById(req.params.id);
  appAssert(user, NOT_FOUND, 'User not found');

  delete user.email;
  delete user.password;

  return res.status(OK).json(user);
};
