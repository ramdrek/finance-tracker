// src/routes/api/trpc/[...trpc]/+server.ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '$lib/server/trpc/router'
import { createContext } from '$lib/server/trpc/context'

export const GET = (event: { request: any }) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req: event.request,
    router: appRouter,
    createContext,
  })
