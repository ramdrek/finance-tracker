<script lang="ts">
  import { trpc } from '$lib/trpc/trpcClient';
  import { writable } from 'svelte/store';
  import { get } from 'svelte/store';
  
  type Transaction = {
    id: string;
    type: string;
    amount: number;
    category: string;
    note?: string | null;
    createdAt: string;
  };
  
  type Category = {
    id: string;
    name: string;
    group: string;
    createdAt: string;
    updatedAt: string;
  };

  export let data: {
    transactions: Transaction[]
    categories: Category[]
  };

  const transactions = writable<Transaction[]>(data.transactions);  
  const categories = writable<Category[]>(data.categories);

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

    const newTransaction = await client.addTransaction.mutate({
      type: $type,
      amount: $amount,
      category: $category,
      note: $note,
    });
    console.log('Saved transaction:', newTransaction);

    showForm.set(false);
    await loadTransactions();
  }

  //For Edit Transaction
  let editingId: string | null = null;
  let form = { type: 'expense', amount: 0, category: '', note: '' };
  async function editTransaction(id: string) {
    editingId = id;
    const client = get(trpc);
    if (!client) return;
    const tx = (await client.getTransactions.query()).find((t) => t.id === id);
    if (tx) form = { ... tx, note: tx.note ?? '' };
  }

  async function saveTransaction(event: SubmitEvent) {
    event.preventDefault();
    if (!editingId) return;
    const client = get(trpc);
    if (!client) return;
    const tx = (await client.updateTransaction.mutate({ id: editingId, ...form }));
    editingId = null;
    await loadTransactions();
  }

  // For Delete Transaction
  async function deleteTransaction(id: string) {
    const client = get(trpc);
    if (!client) return;
    if (confirm("Are you sure you want to delete this transaction")) {
      await client.deleteTransaction.mutate({ id });
      await loadTransactions();
    }
  }

  //Group categories by type
  // group categories by type (Income, Housing, etc.)
  const groupedCategories = data.categories.reduce((acc, cat) => {
    if (!acc[cat.group]) acc[cat.group] = [];
    acc[cat.group].push(cat);
    return acc;
  }, {} as Record<string, typeof data.categories>);

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
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
            <div>
              <label for="amount">Amount</label>
              <input id="amount" type="number" bind:value={$amount} class="w-full p-2 border rounded" />
            </div>
            <div>
              <label for="category">Category</label>
              <select id="category" bind:value={$category} class="w-full px-4 py-2 border rounded-md text-blue-900">
                <option value="" disabled selected>Select a category</option>
                {#each Object.entries(groupedCategories) as [group, cats]}
                  <optgroup label={group}>
                    {#each cats as cat}
                      <option value={cat.name}>{cat.name}</option>
                    {/each}
                  </optgroup>
                {/each}
              </select>
              <!-- <input id="category" type="text" bind:value={$category} class="w-full p-2 border rounded" /> -->
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
              <button on:click={() => editTransaction(txn.id)} class="text-blue-400 hover:underline font-medium">Edit</button>
              <button on:click={() => deleteTransaction(txn.id)} class="text-red-400 hover:underline font-medium">Delete</button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <!-- Edit Form (OUTSIDE the table) -->
    {#if editingId}
    <form on:submit|preventDefault={saveTransaction} class="bg-blue-50 p-6 rounded-lg shadow-md mt-6 max-w-md mx-auto space-y-4">
      <h2 class="text-xl font-semibold text-blue-800">Edit Transaction</h2>
      
      <div>
        <label for="category" class="block text-sm text-blue-700 mb-1">Category</label>
        <select id="category" bind:value={form.category} class="w-full px-4 py-2 border rounded-md text-blue-900">
          <option value="" disabled selected>Select a category</option>
          {#each Object.entries(groupedCategories) as [group, cats]}
            <optgroup label={group}>
              {#each cats as cat}
                <option value={cat.name}>{cat.name}</option>
              {/each}
            </optgroup>
          {/each}
        </select>
        <!-- <input
          id="category"
          type="text"
          bind:value={form.category}
          placeholder="Category"
          class="w-full px-4 py-2 border border-blue-300 rounded-md text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-blue-400"
        /> -->
      </div>

      <div>
        <label for="amount" class="block text-sm text-blue-700 mb-1">Amount</label>
        <input
          id="amount"
          type="number"
          bind:value={form.amount}
          placeholder="Amount"
          class="w-full px-4 py-2 border border-blue-300 rounded-md text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-blue-400"
        />
      </div>

      <div>
        <label for="type" class="block text-sm text-blue-700 mb-1">Type</label>
        <select
          id="type"
          bind:value={form.type}
          class="w-full px-4 py-2 border border-blue-300 rounded-md text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-blue-400"
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
      </div>

      <div>
        <label for="note" class="block text-sm text-blue-700 mb-1">Note</label>
        <input
          id="note"
          type="text"
          bind:value={form.note}
          placeholder="Optional note"
          class="w-full px-4 py-2 border border-blue-300 rounded-md text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-blue-400"
        />
      </div>

      <div class="flex justify-end gap-2">
        <button
          type="submit"
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save
        </button>
        <button
          type="button"
          on:click={() => (editingId = null)}
          class="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  {/if}
  </div>
</div>
