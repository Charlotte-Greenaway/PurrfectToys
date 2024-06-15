import { z } from 'zod';
import { Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Define the validation schema using zod
const schema = z.object({
  name: z.string().min(1, 'Name is required').nullable(),
  address: z.string().min(1, 'Address is required').nullable(),
  phone: z.string().regex(/^[0-9]+$/, 'Phone number is not valid').nullable().refine(val => val !== null, 'Phone is required'), // Ensuring phone contains only numbers and is not null
  mailingPreferences: z.string().nullable(),
});

// Create the resolver
const resolver: Resolver<z.infer<typeof schema>> = zodResolver(schema);

export default resolver;
