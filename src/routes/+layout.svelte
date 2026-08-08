<script lang="ts">
  import '../app.css';
  import ContactSection from '$lib/components/ContactSection.svelte';

  let { children } = $props();
</script>

<div class="relative flex flex-col min-h-screen bg-[#0A0A0A] text-white">
  <main class="flex-grow w-full">
    {@render children()}
  </main>
  <ContactSection />
</div>
