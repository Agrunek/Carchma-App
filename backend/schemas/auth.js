import { z } from 'zod';

const namePattern = z.string().min(1).max(255);
const emailPattern = z.string().min(1).email().max(255);
const passwordPattern = z.string().min(8).max(255);
const agentPattern = z.string().max(255).optional();

const credentialsPattern = z.object({
  name: namePattern,
  email: emailPattern,
  password: passwordPattern,
  confirm: passwordPattern,
  agent: agentPattern,
});

const confirmRefine = (data) => data.password === data.confirm;
const confirmIssue = { message: 'Passwords are not the same', path: ['confirm'] };

export const registerSchema = credentialsPattern.refine(confirmRefine, confirmIssue);

export const loginSchema = credentialsPattern.omit({ confirm: true, name: true });

export const forgotPasswordSchema = credentialsPattern.pick({ email: true });

export const resetPasswordSchema = credentialsPattern
  .pick({ password: true, confirm: true })
  .refine(confirmRefine, confirmIssue);
