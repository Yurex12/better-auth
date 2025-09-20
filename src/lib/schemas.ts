import z from 'zod';

export const userSchema = z.object({
  name: z
    .string()
    .trim()
    .min(6, 'username should be at least 6 characters')
    .max(10, 'username should not be more than 10 characters'),
  email: z.email().trim(),
  password: z
    .string()
    .trim()
    .min(8, 'password should be at least 8 characters')
    .max(10, 'password should not be more than 10 characters'),
});

export const loginSchema = z.object({
  email: z.email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
});

export const serverLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'password should be at least 8 characters'),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export type TUserSchema = z.infer<typeof userSchema>;
