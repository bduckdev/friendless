import { TRPCError } from "@trpc/server";
import type { Context } from "../trpc";
import { getUserIdFromContext } from "../utils";
import { type UpdateUserType } from "../schemas/user.schema";

export async function getUserHandler(ctx: Context) {
    const userId = getUserIdFromContext(ctx);
    const user = await ctx.db.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            gender: true,
            subscriptionTier: true,
            subscriptionStatus: true,
            messagesUsedToday: true,
            dailyQuotaResetAt: true,
            createdAt: true,
        },
    });
    if (!user) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
        });
    }

    return user;
}

export async function updateUserHandler(ctx: Context, input: UpdateUserType) {
    const userId = getUserIdFromContext(ctx);
    const user = await ctx.db.user.update({
        where: { id: userId },
        data: { ...input },
    });
    if (!user) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
        });
    }

    return user;
}

export async function getStatsHandler(ctx: Context) {
    const userId = getUserIdFromContext(ctx);
    const user = await ctx.db.user.findUnique({
        where: { id: userId },
        select: { createdAt: true },
    });
    if (!user) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "User not found",
        });
    }

    // Get total friends count
    const totalFriends = await ctx.db.friend.count({
        where: { userId },
    });
    const totalMessages = await ctx.db.message.count({
        where: { userId },
    });
    // Calculate account age in days
    const now = new Date();
    const accountAge = Math.floor(
        (now.getTime() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24),
    );

    // Get most active friend (by message count)
    const friendsWithMessageCounts = await ctx.db.friend.findMany({
        where: { userId },
        include: {
            _count: {
                select: { messages: true },
            },
        },
        orderBy: {
            messages: {
                _count: "desc",
            },
        },
        take: 1,
    });

    const mostActiveFriend = friendsWithMessageCounts[0]
        ? {
            id: friendsWithMessageCounts[0].id,
            name: friendsWithMessageCounts[0].name,
            messageCount: friendsWithMessageCounts[0]._count.messages,
        }
        : null;

    return {
        totalFriends,
        totalMessages,
        accountAge,
        mostActiveFriend,
    };
}
