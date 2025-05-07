<script lang="ts">
  import { writable } from 'svelte/store';

  type Transaction = {
    id: string;
    type: string;
    amount: number;
    category: string;
    note?: string;
    createdAt: string;
  };

  export let data: { transactions: Transaction[] };
  const transactions = writable<Transaction[]>(data.transactions);
</script>

<div class="p-6 bg-gray-900 min-h-screen text-gray-100">
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-3xl font-semibold text-blue-400">Transactions</h1>
    <button class="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2 rounded-lg shadow">
      + Add Transaction
    </button>
  </div>

  <div class="overflow-x-auto rounded-lg shadow-lg bg-gray-800">
    <table class="min-w-full text-sm">
      <thead>
        <tr class="bg-blue-700 text-white">
          <th class="px-4 py-3 text-left">Date</th>
          <th class="px-4 py-3 text-left">Type</th>
          <th class="px-4 py-3 text-left">Category</th>
          <th class="px-4 py-3 text-left">Amount</th>
          <th class="px-4 py-3 text-left">Note</th>
          <th class="px-4 py-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#each $transactions as txn, i}
          <tr class="{i % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'} hover:bg-blue-900 transition-colors duration-150">
            <td class="px-4 py-3">{new Date(txn.createdAt).toLocaleDateString()}</td>
            <td class="px-4 py-3">{txn.type}</td>
            <td class="px-4 py-3">{txn.category}</td>
            <td class="px-4 py-3 text-blue-300 font-semibold">${txn.amount.toFixed(2)}</td>
            <td class="px-4 py-3">{txn.note || '-'}</td>
            <td class="px-4 py-3 text-right space-x-2">
              <button class="text-blue-400 hover:underline font-medium">Edit</button>
              <button class="text-red-400 hover:underline font-medium">Delete</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
