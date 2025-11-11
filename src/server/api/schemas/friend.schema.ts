import z from "zod";

export const GenderEnum = z.enum(["male", "female", "non_binary"]);

export const CreateFriendSchema = z.object({
    name: z.string().min(1).max(100),
    personality: z.string().min(10).max(1000),
    age: z.number().int().min(18).max(1000),
    gender: GenderEnum,
    traits: z.array(z.string()).max(10),
    voice: z.string().max(50),
    background: z.string().max(2000),
    interests: z.array(z.string()).max(20),
    avatar: z.string(),
});

export const FriendIdSchema = z.object({
    friendId: z.cuid(),
});

export const FRIEND_LIMITS = {
    free: 50,
    premium: -1,
};

export type CreateFriendType = z.infer<typeof CreateFriendSchema>;
export type FriendIdType = z.infer<typeof FriendIdSchema>;
