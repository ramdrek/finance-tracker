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
});

export type AppRouter = typeof appRouter;
