import { z } from 'zod';
import { t } from '../trpc';
import { PrismaClient } from '@prisma/client';

//const t = initTRPC.create()

const prisma = new PrismaClient();

export const appRouter = t.router({
  getTransactions: t.procedure.query(async () => {
    return await prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }),
  addTransaction: t.procedure.input(z.object({
    type: z.string(),
    amount: z.number(),
    category: z.string(),
    note: z.string().optional(),
  }))
  .mutation(async ({ input }) => {
    return await prisma.transaction.create({
      data: {
        ...input,
      },
    });
  }),
});

export type AppRouter = typeof appRouter;
