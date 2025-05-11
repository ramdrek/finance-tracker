import { z } from 'zod';
import { t } from '../trpc';
import { prisma } from '../db';

export const appRouter = t.router({
  getTransactions: t.procedure.query(async () => {
    return await prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }),
  addTransaction: t.procedure.input(
    z.object({
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
  updateTransaction: t.procedure.input(
    z.object({
      id: z.string(),
      type: z.string(),
      amount: z.number(),
      category: z.string(),
      note: z.string().optional(),
    }))
    .mutation(({ input }) => {
      return prisma.transaction.update({
        where: { id: input.id },
        data: {
          type: input.type,
          amount: input.amount,
          category: input.category,
          note: input.note,
        }
      });
  }),
  deleteTransaction: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      return prisma.transaction.delete({
        where: { id: input.id }
      })
  }),
  // CATEGORIES
  getCategories: t.procedure.query(() => {
    return prisma.category.findMany({
      orderBy: [{ group: 'asc' }, {name: 'asc'}],
    })
  })
});

export type AppRouter = typeof appRouter;
