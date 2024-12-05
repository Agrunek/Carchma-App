import { z } from 'zod';
import { createAccount } from '../services/auth.js';
import { setAuthCookies } from '../utils/cookies.js';
import { CREATED } from '../constants/http.js';

const registerSchema = z
  .object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(8).max(255),
    confirm: z.string().min(8).max(255),
    agent: z.string().optional(),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords are not the same',
    path: ['confirm'],
  });

export const registerHandler = async (req, res) => {
  const { email, password, agent } = registerSchema.parse({
    ...req.body,
    agent: req.headers['user-agent'],
  });

  const { user, accessToken, refreshToken } = await createAccount(email, password, agent);

  return setAuthCookies(res, accessToken, refreshToken).status(CREATED).json(user);
};
