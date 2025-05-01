import type { Load } from '@sveltejs/kit'
import { createTrpcClient } from '$lib/trpc/createClient'

export const load: Load = async (event) => {
  const trpc = createTrpcClient(event.fetch)
  const greeting = await trpc.hello.query()
  return { greeting }
}
