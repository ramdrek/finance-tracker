import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.transaction.createMany({
    data: [
      {type: 'Expense', amount: 2900, category: 'Mortgage', note: 'Casa Milssen'},
      {type: 'Expense', amount: 170.55, category: 'Auto Insurance', note: 'Silv and Ollie'},
      {type: 'Expense', amount: 30, category: 'Transportation', note: 'Gas'}
    ]
  });

  await prisma.category.createMany({
    data: [
      { name: 'Salary', group: 'Income' },
      { name: 'Bonus', group: 'Income' },
      { name: 'Freelance', group: 'Income' },
      { name: 'Interest', group: 'Income' },
      { name: 'Dividends', group: 'Income' },
      { name: 'Investment Returns', group: 'Income' },
      { name: 'Gift', group: 'Income' },
      { name: 'Reimbursement', group: 'Income' },

      { name: 'Rent', group: 'Housing' },
      { name: 'Mortgage', group: 'Housing' },
      { name: 'Property Tax', group: 'Housing' },
      { name: 'Home Insurance', group: 'Housing' },
      { name: 'Repairs/Maintenance', group: 'Housing' },

      { name: 'Auto Insurance', group: 'Transportation' },
      { name: 'Gas', group: 'Transportation' },
      { name: 'Car Wash', group: 'Transportation' },

      { name: 'Groceries', group: 'Food' },
      { name: 'Restaurants', group: 'Food' },
      { name: 'Snacks', group: 'Food' },

      { name: 'Electricity', group: 'Utilities' },
      { name: 'Water', group: 'Utilities' },
      { name: 'Gas', group: 'Utilities' },
      { name: 'Internet', group: 'Utilities' },
      { name: 'Mobile Phone', group: 'Utilities' },

      { name: 'Insurance Premiums', group: 'Healthcare' },
      { name: 'Doctor Visits', group: 'Healthcare' },
      { name: 'Medication', group: 'Healthcare' },
      { name: 'Dental', group: 'Healthcare' },
      { name: 'Vision', group: 'Healthcare' },

      { name: 'Courses', group: 'Education' },
      { name: 'Books/Supplies', group: 'Education' },
      { name: 'Tuition', group: 'Education' },

      { name: 'Clothing', group: 'Personal' },
      { name: 'Haircuts', group: 'Personal' },
      { name: 'Subscriptions', group: 'Personal' },
      { name: 'Gym Membership', group: 'Personal' },
      { name: 'Hobbies', group: 'Personal' },

      { name: 'Movies', group: 'Entertainment' },
      { name: 'Travel', group: 'Entertainment' },
      { name: 'Games', group: 'Entertainment' },

      { name: 'Credit Card Payments', group: 'Financial' },
      { name: 'Loan Repayments', group: 'Financial' },
      { name: 'Savings Contribution', group: 'Financial' },
      { name: 'Investment', group: 'Financial' },

      { name: 'Pet Care', group: 'Miscellaneous' },
      { name: 'Gifts & Donations', group: 'Miscellaneous' },
      { name: 'Emergency Fund', group: 'Miscellaneous' },
      { name: 'Loan', group: 'Miscellaneous' },
      // ... add more categories
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