import { z } from 'zod';

export const dogValidator = z.object({
  name: z.string().min(3),
  age: z.number().int().min(1),
  breed: z.string().min(3),
});
