<script lang="ts">
	import '../app.css';
  export let data: {
    currentPath: string;
  };
</script>

<div class="flex h-screen bg-gray-900 text-white">
  <!-- Sidebar -->
  <aside class="w-64 bg-gray-800 flex-shrink-0 p-6">
    <h1 class="text-2xl font-bold text-blue-400 mb-6">Finance Tracker</h1>
    <nav class="space-y-2">
      <a
        href="/transactions"
        class="block px-4 py-2 rounded transition-colors"
        class:bg-blue-700={data.currentPath.startsWith('/transactions')}
      >
        Transactions
      </a>
    </nav>
  </aside>

  <!-- Main content -->
  <main class="flex-1 overflow-y-auto p-6">
    <slot />
  </main>
</div>
