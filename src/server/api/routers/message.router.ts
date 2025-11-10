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
        .mutation(async ({ ctx, input }) => {
            return sendStreamingHandler(ctx, input);
        }),
    send: protectedProcedure
        .input(SendMessageSchema)
        .mutation(async ({ ctx, input }) => {
            return sendMessageHandler(ctx, input);
        }),
    getByFriend: protectedProcedure
        .input(GetByFriendSchema)
        .query(async ({ ctx, input }) => {
            return getMessagesByFriendHandler(ctx, input);
        }),
    deleteRollback: protectedProcedure
        .input(DeleteRollbackSchema)
        .mutation(async ({ ctx, input }) => {
            return deleteRollbackHandler(ctx, input);
        }),
});
