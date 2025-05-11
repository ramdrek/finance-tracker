import { createTrpcClient } from '$lib/trpc/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const trpc = createTrpcClient(fetch);

  const [transactions, categories ] = await Promise.all([
    await trpc.getTransactions.query(),
    await trpc.getCategories.query()
  ]);

  return { transactions, categories };
};
