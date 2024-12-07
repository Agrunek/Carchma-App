import { z } from 'zod';

const emailPattern = z.string().email().min(1).max(255);
const passwordPattern = z.string().min(8).max(255);
const agentPattern = z.string().optional();

const registerPattern = z.object({
  email: emailPattern,
  password: passwordPattern,
  confirm: passwordPattern,
  agent: agentPattern,
});

const loginPattern = z.object({
  email: emailPattern,
  password: passwordPattern,
  agent: agentPattern,
});

export const registerSchema = registerPattern.refine((data) => data.password === data.confirm, {
  message: 'Passwords are not the same',
  path: ['confirm'],
});

export const loginSchema = loginPattern;
