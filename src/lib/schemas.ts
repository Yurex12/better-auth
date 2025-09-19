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

export type TUserSchema = z.infer<typeof userSchema>;
