import express, { Express } from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './trpc/router';
import { createContext } from './trpc/trpc';
var cors = require('cors');

const app: Express = express();
const port = 3000;
const base = '/trpc';

// allow cors
app.use(cors());

app.use(
    base,
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    }),
);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});