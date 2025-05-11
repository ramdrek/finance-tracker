import { createTrpcClient } from '$lib/trpc/client';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const trpc = createTrpcClient(fetch);
  const recentTransactions = await trpc.getTransactions.query();

  // Just take the 5 most recent by createdAt descending
  const recent = [...recentTransactions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  return { 
    recent,
  };
};
