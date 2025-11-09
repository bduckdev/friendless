import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
    DeleteRollbackSchema,
    GetByFriendSchema,
    SendMessageSchema,
} from "../schemas/message.schema";
import {
    deleteRollbackHandler,
    getMessagesByFriendHandler,
    sendMessageHandler,
    sendStreamingHandler,
} from "../controllers/message.controller";

export const messageRouter = createTRPCRouter({
    sendStreaming: protectedProcedure
        .input(SendMessageSchema)
        .mutation(async function*({ ctx, input }) {
            return sendStreamingHandler(ctx, input);
        }),
    send: protectedProcedure
        .input(SendMessageSchema)
        .mutation(async ({ ctx, input }) => {
            return sendMessageHandler(ctx, input);
        }),
    // Get messages for a specific friend with pagination
    getByFriend: protectedProcedure
        .input(GetByFriendSchema)
        .query(async ({ ctx, input }) => {
            return getMessagesByFriendHandler(ctx, input);
        }),
    // Delete an assistant message and its preceding user message (rollback conversation)
    deleteRollback: protectedProcedure
        .input(DeleteRollbackSchema)
        .mutation(async ({ ctx, input }) => {
            return deleteRollbackHandler(ctx, input);
        }),
});
