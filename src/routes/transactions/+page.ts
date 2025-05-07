import { createTrpcClient } from '$lib/trpc/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const trpc = createTrpcClient(fetch);
  const transactions = await trpc.getTransactions.query();
  return { transactions };
};
