import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.transaction.createMany({
    data: [
      {type: 'Expense', amount: 45.99, category: 'Food', note: 'Groceries - Walmart'},
      {type: 'Expense', amount: 170.55, category: 'Insurance', note: 'Auto Insurance'},
      {type: 'Expense', amount: 30, category: 'Transportation', note: 'Gas'}
    ]
  });
}

main()
  .then(() => {
    console.log('✅ Seed data inserted');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })