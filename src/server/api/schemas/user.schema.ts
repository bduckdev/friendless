import z from "zod";

export const UpdateUserSchema = z.object({
    name: z.string().min(5).max(255),
    email: z.email().min(5).max(255),
});

export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
