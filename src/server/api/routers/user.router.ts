import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
    getStatsHandler,
    getUserHandler,
    updateUserHandler,
} from "../controllers/user.controller";
import { UpdateUserSchema } from "../schemas/user.schema";

export const userRouter = createTRPCRouter({
    getUser: protectedProcedure.query(async ({ ctx }) => {
        return getUserHandler(ctx);
    }),
    updateUser: protectedProcedure
        .input(UpdateUserSchema)
        .mutation(async ({ ctx, input }) => {
            return updateUserHandler(ctx, input);
        }),
    getStats: protectedProcedure.query(async ({ ctx }) => {
        return getStatsHandler(ctx);
    }),
});
