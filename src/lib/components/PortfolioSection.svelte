<script lang="ts">
  import { Eye, X } from '@lucide/svelte';
  import { fade, scale } from 'svelte/transition';

  const portfolioItems = [
    {
      id: 1,
      src: "/portfolio/1 (1).webp",
      title: "Konstruksi & Rental",
      category: "CV. Eka Dwi Kencana",
    },
    { id: 2, src: "/portfolio/1 (2).webp", title: "Konstruksi", category: "CV. Ilham Mulia" },
    {
      id: 3,
      src: "/portfolio/1 (3).webp",
      title: "Perdagangan Umum",
      category: "PT. Amripar Sukses Alam Lestari",
    },
    {
      id: 4,
      src: "/portfolio/1 (4).webp",
      title: "Perdagangan Umum",
      category: "PT. Alfa Eka Sapta",
    },
    {
      id: 5,
      src: "/portfolio/1 (5).webp",
      title: "Supplier Industri",
      category: "PT. Berkah Pratama Steel",
    },
    {
      id: 6,
      src: "/portfolio/1 (6).webp",
      title: "Supplier Solar",
      category: "PT. Bima Ndai Bersama",
    },
    {
      id: 7,
      src: "/portfolio/1 (7).webp",
      title: "Perdagangan Umum",
      category: "PT. Berliana Intan Fast",
    },
    {
      id: 8,
      src: "/portfolio/1 (8).webp",
      title: "Supplier Industri",
      category: "PT. Frotuna Jaya Selaras",
    },
    {
      id: 9,
      src: "/portfolio/1 (9).webp",
      title: "Fabrikasi",
      category: "CV. Qaishar Indo Teknik",
    },
  ];

  let selectedImage = $state<string | null>(null);
  let selectedAlt = $state<string>('');

  function openModal(src: string, altText: string) {
    selectedImage = src;
    selectedAlt = altText;
  }

  function closeModal() {
    selectedImage = null;
    selectedAlt = '';
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }
</script>

<svelte:window onkeydown={handleKeyDown} />

<section id="portfolio" class="py-20 bg-[#0f172a]">
  <div class="max-w-7xl mx-auto px-6">
    <h2 class="text-4xl font-bold text-center mb-12 text-white">
      Portofolio <span class="text-emerald-400">Desain Kami</span>
    </h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each portfolioItems as item}
        <button
          type="button"
          onclick={() => openModal(item.src, `${item.title} - ${item.category}`)}
          class="group relative w-full h-[300px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 text-left transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/50 shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400"
        >
          <img
            src={item.src}
            alt={`${item.title} - ${item.category}`}
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end justify-between p-5">
            <div>
              <p class="text-sm text-emerald-400 font-bold">{item.title}</p>
              <p class="text-xs text-slate-300 font-medium">{item.category}</p>
            </div>
            <div class="bg-emerald-500/80 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-md">
              <Eye size={18} />
            </div>
          </div>
        </button>
      {/each}
    </div>
  </div>

  <!-- Lightbox Modal -->
  {#if selectedImage}
    <div
      transition:fade={{ duration: 200 }}
      onclick={closeModal}
      role="button"
      tabindex="0"
      aria-label="Tutup preview"
      onkeydown={(e) => e.key === 'Enter' && closeModal()}
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-md cursor-zoom-out"
    >
      <button
        type="button"
        onclick={closeModal}
        aria-label="Tutup modal"
        class="fixed top-6 right-6 z-[60] text-white/70 hover:text-white bg-black/40 hover:bg-slate-800 backdrop-blur-sm p-3 rounded-full transition-all duration-200"
      >
        <X size={28} />
      </button>

      <div
        transition:scale={{ duration: 250, start: 0.9 }}
        onclick={(e) => e.stopPropagation()}
        role="presentation"
        class="relative w-full max-w-5xl mx-auto my-auto flex justify-center"
      >
        <img
          src={selectedImage}
          alt={selectedAlt}
          class="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl border border-slate-800"
        />
      </div>
    </div>
  {/if}
</section>
