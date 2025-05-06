<script lang="ts">
  export let data: {
    transactions: {
      id: string;
      type: string;
      amount: number;
      category: string;
      note?: string;
      createdAt: string;
      updatedAt: string;
    }[];
  };
</script>

<h2 class="text-xl font-bold mb-4">Transactions</h2>

{#if data.transactions.length === 0}
  <p>No transactions available.</p>
{:else}
  <ul class="space-y-4">
    {#each data.transactions as txn}
      <li class="border p-4 rounded shadow">
        <div><strong>Type:</strong> {txn.type}</div>
        <div><strong>Amount:</strong> ${txn.amount}</div>
        <div><strong>Category:</strong> {txn.category}</div>
        {#if txn.note}
          <div><strong>Note:</strong> {txn.note}</div>
        {/if}
        <small class="text-gray-500 block mt-2">
          Created: {new Date(txn.createdAt).toLocaleString()}
        </small>
      </li>
    {/each}
  </ul>
{/if}
