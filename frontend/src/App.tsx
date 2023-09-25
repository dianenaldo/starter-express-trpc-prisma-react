import { useEffect } from "react";
import { AppRouter } from "../../backend/trpc/router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

function App() {
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/trpc",
      }),
    ],
  });

  useEffect(() => {
    (async () => {
      const users = await client.getUsers.query();
      const user = await client.getUser.query({ id: 1 });
      const hello = await client.hello.query({ name: "John" });
      console.log({ users, user, hello });
    })();
  }, []);

  return (
    <>
      <h1>Express + TRPC + Prisma + React</h1>
    </>
  );
}

export default App;
