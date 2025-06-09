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

const resetPasswordPattern = z.object({
  password: passwordPattern,
  confirm: passwordPattern,
  verificationCode: verificationCodePattern,
});

const confirmRefine = (data) => data.password === data.confirm;
const confirmIssue = { message: 'Passwords are not the same', path: ['confirm'] };

export const registerSchema = registerPattern.refine(confirmRefine, confirmIssue);

export const loginSchema = z.object({
  email: emailPattern,
  password: passwordPattern,
  agent: agentPattern,
});

export const emailVerificationSchema = z.object({
  verificationCode: verificationCodePattern,
});

export const forgotPasswordSchema = z.object({
  email: emailPattern,
});

export const resetPasswordSchema = resetPasswordPattern.refine(confirmRefine, confirmIssue);
