import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Nieprawidłowy adres email').min(1).max(255),
  password: z.string().min(8, 'Hasło musi się składać z przynajmniej 8 znaków').max(255),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, 'Imię nie może być puste').max(255),
    email: z.string().email('Nieprawidłowy adres email').min(1).max(255),
    password: z.string().min(8, 'Hasło musi się składać z przynajmniej 8 znaków').max(255),
    confirm: z.string().min(8, 'Hasło musi się składać z przynajmniej 8 znaków').max(255),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Hasła nie są takie same',
    path: ['confirm'],
  });

export type LoginInputs = z.infer<typeof LoginSchema>;

export type RegisterInputs = z.infer<typeof RegisterSchema>;
