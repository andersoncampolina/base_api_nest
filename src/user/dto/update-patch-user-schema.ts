import { z } from 'zod';
import { createUserSchema } from './create-user-schema';

export const updatePatchUserSchema = createUserSchema.partial();

// export const updatePatchUserSchema = z.object({
//     name: z.string().optional(),
//     email: z.string().email().optional(),
//     password: z.string().optional()
// }).refine(
//     ({ name, email, password }) => 
//         name !== undefined || email !== undefined || password !== undefined,
//     { message: "Pelo menos um campo deve ser preenchido." }
// );

export type UpdatePatchUserDto = z.infer<typeof updatePatchUserSchema>;