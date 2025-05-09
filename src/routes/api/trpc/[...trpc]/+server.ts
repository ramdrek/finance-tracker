// src/routes/api/trpc/[...trpc]/+server.ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '$lib/server/trpc/router'
import { createContext } from '$lib/server/trpc/context'

const handler = (event: { request: any }) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req: event.request,
    router: appRouter,
    createContext,
  });

  export const GET = handler;
  export const POST = handler;