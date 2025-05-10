import { z } from 'zod';

export const CreateUserSchema = z.object({
  username: z
    .string()
    .min(4, 'Username must be at least 4 characters')
    .max(20, 'Username must be at most 20 characters')
    .regex(
      /^[a-zA-Z0-9_.]+$/,
      'Only alphanumeric characters, underscores, and dots are allowed'
    ),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password too long')
    .regex(/[a-z]/, 'Must include a lowercase letter')
    .regex(/[A-Z]/, 'Must include an uppercase letter')
    .regex(/[0-9]/, 'Must include a number')
    .regex(/[^a-zA-Z0-9]/, 'Must include a special character'),

  name: z.string().min(1, 'Name is required').max(50, 'Name too long'),
});

export const SigninSchema = z.object({
  username: z
    .string()
    .min(4, 'Invalid username')
    .regex(/^[a-zA-Z0-9_.]+$/, 'Invalid username format'),

  password: z.string().min(8, 'Invalid password'),
});

export const CreateRoomSchema = z.object({
  name: z
    .string()
    .min(3, 'Room name must be at least 3 characters')
    .max(30, 'Room name too long'),
});
