import { userIdSchema } from '../schemas/user.js';
import { showPrivateUserAccount, showPublicUserAccount } from '../services/user.js';
import { OK } from '../constants/http.js';

export const currentProfileHandler = async (req, res) => {
  const userId = userIdSchema.parse(req.userId);

  const { user } = await showPrivateUserAccount(userId);

  return res.status(OK).json(user);
};

export const anyProfileHandler = async (req, res) => {
  const userId = userIdSchema.parse(req.params.id);

  const { user } = await showPublicUserAccount(userId);

  return res.status(OK).json(user);
};
