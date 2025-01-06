import { z } from 'zod';

const namePattern = z.string().min(1).max(255);
const emailPattern = z.string().email().min(1).max(255);
const passwordPattern = z.string().min(8).max(255);
const agentPattern = z.string().max(255).optional();
const verificationCodePattern = z.string().length(128);

const registerPattern = z.object({
  name: namePattern,
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

const emailVerificationPattern = z.object({
  verificationCode: verificationCodePattern,
});

const forgotPasswordPattern = z.object({
  email: emailPattern,
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

export const emailVerificationSchema = emailVerificationPattern;

export const forgotPasswordSchema = forgotPasswordPattern;

export const resetPasswordSchema = resetPasswordPattern.refine((data) => data.password === data.confirm, {
  message: 'Passwords are not the same',
  path: ['confirm'],
});
