import appAssert from '../utils/appAssert.js';
import { getUserById } from '../models/user.js';
import { NOT_FOUND } from '../constants/http.js';

export const showPrivateUserAccount = async (userId) => {
  const user = await getUserById(userId);
  appAssert(user, NOT_FOUND, 'User not found');

  /* Prevent return of the generated password: */
  delete user.password;

  return { user };
};

export const showPublicUserAccount = async (userId) => {
  const user = await getUserById(userId);
  appAssert(user, NOT_FOUND, 'User not found');

  /* Prevent return of the generated password: */
  delete user.password;

  /* Prevent return of the private account information: */
  delete user.email;

  return { user };
};
