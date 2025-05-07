<script lang="ts">
  type Transaction = {
    id: string;
    type: string;
    amount: number;
    category: string;
    note?: string;
    createdAt: string;
  };

  export let data: {
    recent: Transaction[];
  };
</script>

<div class="space-y-6 text-gray-200">
  <div>
    <h1 class="text-3xl font-bold text-blue-400">Welcome back 👋</h1>
    <p class="text-gray-400">Here are your 5 most recent transactions:</p>
  </div>

  <div class="overflow-hidden rounded-lg shadow bg-gray-800">
    <table class="min-w-full text-sm">
      <thead>
        <tr class="bg-blue-600 text-white">
          <th class="px-4 py-3 text-left">Date</th>
          <th class="px-4 py-3 text-left">Type</th>
          <th class="px-4 py-3 text-left">Category</th>
          <th class="px-4 py-3 text-left">Amount</th>
        </tr>
      </thead>
      <tbody>
        {#each data.recent as txn, i}
          <tr class="{i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} hover:bg-gray-700 transition">
            <td class="px-4 py-3">{new Date(txn.createdAt).toLocaleDateString()}</td>
            <td class="px-4 py-3">{txn.type}</td>
            <td class="px-4 py-3">{txn.category}</td>
            <td class="px-4 py-3 font-semibold text-blue-400">${txn.amount.toFixed(2)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
