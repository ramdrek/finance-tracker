// src/lib/server/trpc/router.ts
import { initTRPC } from '@trpc/server'
const t = initTRPC.create()

export const appRouter = t.router({
  hello: t.procedure.query(() => 'Hello from tRPC 🎉'),
})

export type AppRouter = typeof appRouter
