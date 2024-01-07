import { postRouter } from "~/server/api/routers/post";
import { mailRouter } from "~/server/api/routers/mail";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  mail: mailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
