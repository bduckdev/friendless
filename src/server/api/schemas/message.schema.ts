import z from "zod";

export const SendMessageSchema = z.object({
    friendId: z.cuid(),
    content: z.string().min(1).max(2000),
});

export const GetByFriendSchema = z.object({
    friendId: z.cuid(),
    limit: z.number().int().min(1).max(100).default(50),
    cursor: z.string().optional(),
});

export const DeleteRollbackSchema = z.object({
    assistantMessageId: z.cuid(),
});

export const MESSAGE_LIMITS = {
    free: 50,
    premium: -1,
};

export type SendMessageType = z.infer<typeof SendMessageSchema>;
export type GetByFriendType = z.infer<typeof GetByFriendSchema>;
export type DeleteRollbackType = z.infer<typeof DeleteRollbackSchema>;
