import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';

export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {
    console.log('createContext ', req.url);
    return {
        req,
        res
    };
};

type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

const isAuthenticated = t.middleware(async ({ next, ctx }) => {
    const isLoggedIn = true;
    if (isLoggedIn) {
        return next({
            ctx: {
                ...ctx,
                user: {
                    isLoggedIn: isLoggedIn,
                },
            },
        });
    } else {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authorized" });
    }
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthenticated);