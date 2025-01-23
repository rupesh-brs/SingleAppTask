import { z } from 'zod';

const userSchema = z.object({
  id: z.number().optional(), 
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  address: z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    zipcode: z.string().nonempty(),
  }),
});


export const usersSchema = z.array(userSchema);
export type User = z.infer<typeof userSchema>;
