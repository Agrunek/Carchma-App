import appAssert from '../utils/appAssert.js';
import { getUserById } from '../models/user.js';
import { NOT_FOUND } from '../constants/http.js';

export const showPrivateUserAccount = async (userId) => {
  const user = await getUserById(userId);
  appAssert(user, NOT_FOUND, 'User not found');

  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;

  return { user };
};

export const showPublicUserAccount = async (userId) => {
  const user = await getUserById(userId);
  appAssert(user, NOT_FOUND, 'User not found');

  delete user.password;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.email;

  return { user };
};
