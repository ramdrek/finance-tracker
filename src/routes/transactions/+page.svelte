<script lang="ts">
  import { trpc } from '$lib/trpc/trpcClient';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  type Transaction = {
    id: string;
    type: string;
    amount: number;
    category: string;
    note?: string | null;
    createdAt: string;
  };

  export let data: { transactions: Transaction[] };
  const transactions = writable<Transaction[]>(data.transactions);

  async function loadTransactions() {
    const client = get(trpc);
    if (!client) return;
    const updated = await client.getTransactions.query();
    transactions.set(updated);
  }

  //For Add Transaction
  const showForm = writable(false);
  const type = writable('expense');
  const amount = writable(0);
  const category = writable('');
  const note = writable('');

  async function addTransaction() {
    const client = get(trpc);
    if (!client) return;

    await client.addTransaction.mutate({
      type: $type,
      amount: $amount,
      category: $category,
      note: $note,
    });

    showForm.set(false);
    await loadTransactions();
  }
</script>

<div class="p-6 bg-gray-900 min-h-screen text-gray-100">
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-3xl font-semibold text-blue-400">Transactions</h1>
    <button 
      class="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2 rounded-lg shadow"
      on:click={() => showForm.set(true)}
    >
      + Add Transaction
    </button>

    {#if $showForm}
      <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white text-black p-6 rounded w-96 space-y-4">
          <h2 class="text-lg font-bold">Add New Transaction</h2>
          <form on:submit|preventDefault={addTransaction}>
            <div>
              <label for="type">Type</label>
              <select id="type" bind:value={$type} class="w-full p-2 border rounded">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label for="amount">Amount</label>
              <input id="amount" type="number" bind:value={$amount} class="w-full p-2 border rounded" />
            </div>
            <div>
              <label for="category">Category</label>
              <input id="category" type="text" bind:value={$category} class="w-full p-2 border rounded" />
            </div>
            <div>
              <label for="note">Note</label>
              <input id="note" type="text" bind:value={$note} class="w-full p-2 border rounded" />
            </div>
            <div class="flex justify-end space-x-2">
              <button type="button" class="px-4 py-2" on:click={() => showForm.set(false)}>Cancel</button>
              <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
            </div>
          </form>
        </div>
      </div>
    {/if}

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
