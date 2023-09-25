import { PrismaClient } from '@prisma/client';
import { UserFindManyArgsSchema, UserWhereInputSchema } from '../prisma/generated/zod';
import { z } from 'zod';
import { router, publicProcedure } from "./trpc";

const prisma = new PrismaClient();

export const appRouter = router({
    getUser: publicProcedure
        .input(UserWhereInputSchema)
        .query(({ input }) => {
            return prisma.user.findMany({
                ...UserFindManyArgsSchema.parse({
                    where: {
                        id: input.id,
                    },
                })
            });
        }),
    getUsers: publicProcedure
        .query(() => {
            return prisma.user.findMany({
                ...UserFindManyArgsSchema.parse({
                    include: {
                        posts: true,
                    },
                }),
            });
        }),
    hello: publicProcedure
        .input(
            z.object({
                name: z.string(),
            }),
        )
        .query(({ input }) => {
            return {
                message: `hello world ${input.name}`,
            };
        }),
});

export type AppRouter = typeof appRouter;