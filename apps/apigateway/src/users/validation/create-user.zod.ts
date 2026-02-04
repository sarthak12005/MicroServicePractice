import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must not exceed 100 characters'),
  
  username: z.string().min(3, 'Username must be at least 3 characters').max(50, 'Username must not exceed 50 characters'),
  
  email: z.string().email('Invalid email format'),
  
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*]/, 'Password must contain at least one special character'),
  
  mobile: z.string()
    .regex(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),
  
  city: z.string().min(2, 'City must be at least 2 characters').max(100, 'City must not exceed 100 characters'),
  
  state: z.string().min(2, 'State must be at least 2 characters').max(100, 'State must not exceed 100 characters'),
  
  district: z.string().min(2, 'District must be at least 2 characters').max(100, 'District must not exceed 100 characters'),
  
  village: z.string().min(2, 'Village must be at least 2 characters').max(100, 'Village must not exceed 100 characters'),
  
  pincode: z.string().regex(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits'),
  
  role: z.enum(['admin', 'user', 'employee']).default('user'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
