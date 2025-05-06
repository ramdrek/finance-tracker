// src/routes/+page.ts
import type { PageLoad } from './$types';
import { createTrpcClient } from '$lib/trpc/client';

export const load: PageLoad = async (event) => {
  const trpc = createTrpcClient(event.fetch);
  const transactions = await trpc.getTransactions.query();

  return {
    transactions,
  };
};
