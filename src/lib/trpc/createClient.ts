// src/lib/trpc/createClient.ts
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '$lib/server/trpc/router'

export function createTrpcClient(fetch: typeof globalThis.fetch) {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
        fetch
      }),
    ],
  })
}
