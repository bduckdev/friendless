import { TRPCError } from "@trpc/server";
import type { Context } from "./trpc";

export function getUserIdFromContext(ctx: Context) {
    const { session } = ctx;
    if (!session) throw new TRPCError({ code: "BAD_REQUEST" });
    return session.user.id;
}
