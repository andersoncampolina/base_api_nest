import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string({message: "O nome é obrigatório"}).min(3, "O nome deve ter no mínimo 3 caracteres."),
    email: z.string({message: "O email é obrigatório"}).email("Formato de e-mail inválido.").min(6, "O email deve ter no mínimo 6 caracteres."),
    password: z.string({message: "O password é obrigatório"}).min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;