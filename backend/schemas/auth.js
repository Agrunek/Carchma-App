import { z } from 'zod';

const emailPattern = z.string().email().min(1).max(255);
const passwordPattern = z.string().min(8).max(255);
const agentPattern = z.string().optional();
const verificationCodePattern = z.string().length(128);

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

const resetPasswordPattern = z.object({
  password: passwordPattern,
  confirm: passwordPattern,
  verificationCode: verificationCodePattern,
});

export const registerSchema = registerPattern.refine((data) => data.password === data.confirm, {
  message: 'Passwords are not the same',
  path: ['confirm'],
});

export const loginSchema = loginPattern;

export const verificationCodeSchema = verificationCodePattern;

export const emailSchema = emailPattern;

export const resetPasswordSchema = resetPasswordPattern.refine((data) => data.password === data.confirm, {
  message: 'Passwords are not the same',
  path: ['confirm'],
});
