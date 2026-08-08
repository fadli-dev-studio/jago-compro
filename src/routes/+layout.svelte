<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import ContactSection from '$lib/components/ContactSection.svelte';

  let { children } = $props();
</script>

<div class="relative flex flex-col min-h-screen bg-[#0f172a] text-white">
  <Navbar />
  <main class="flex-grow w-full">
    {@render children()}
  </main>
  <ContactSection />
</div>
