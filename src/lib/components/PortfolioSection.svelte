<script lang="ts">
  import { onMount } from 'svelte';
  import { Eye, X } from '@lucide/svelte';
  import { fade, scale } from 'svelte/transition';

  let isVisible = $state(false);
  let sectionEl: HTMLElement | null = $state(null);

  // Kategori 1: Desain Company Profile
  const comproItems = [
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

  // Kategori 2: Website Corporate (Data Riil & Screenshot Website Klien)
  const webItems = [
    {
      id: 10,
      src: "/portfolio/lpk_momotaro.webp",
      title: "LPK Momotaro",
      category: "lpk-momotaro.com",
      url: "https://lpk-momotaro.com"
    },
    {
      id: 11,
      src: "/portfolio/flash_auto_logistik.webp",
      title: "PT. Flash Auto Logistik",
      category: "jasakirimflash.com",
      url: "https://jasakirimflash.com"
    },
    {
      id: 12,
      src: "/portfolio/integra_humanika.webp",
      title: "PT. Integra Humanika Nusantara",
      category: "integrahumanika.com",
      url: "https://integrahumanika.com"
    },
    {
      id: 13,
      src: "/portfolio/atlantis_persada.webp",
      title: "PT. Atlantis Persada Energy",
      category: "atlantispersadaenergy.com",
      url: "https://atlantispersadaenergy.com"
    },
    {
      id: 14,
      src: "/portfolio/kinerja_multiteknik.webp",
      title: "CV. Kinerja Multiteknik",
      category: "kinerjamultiteknik.com",
      url: "https://kinerjamultiteknik.com"
    },
    {
      id: 15,
      src: "/portfolio/cv_kanigoro.webp",
      title: "CV. Kanigoro Indonesia",
      category: "cvkanigoro.com",
      url: "https://cvkanigoro.com"
    },
    {
      id: 16,
      src: "/portfolio/litatour_international.webp",
      title: "PT. Pencakrawala Lita International",
      category: "litatourinternational.com",
      url: "https://litatourinternational.com"
    }
  ];

  // State untuk tab aktif (compro atau web)
  let activeTab = $state<'compro' | 'web'>('compro');
  
  // Data item portofolio yang ditampilkan berdasarkan tab aktif
  const displayedItems = $derived(activeTab === 'compro' ? comproItems : webItems);

  let selectedImage = $state<string | null>(null);
  let selectedAlt = $state<string>('');
  let selectedUrl = $state<string | null>(null);

  function openModal(src: string, altText: string, url: string | null = null) {
    selectedImage = src;
    selectedAlt = altText;
    selectedUrl = url;
  }

  function closeModal() {
    selectedImage = null;
    selectedAlt = '';
    selectedUrl = null;
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      closeModal();
    }
  }

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible = true;
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (sectionEl) {
      observer.observe(sectionEl);
    }

    return () => {
      if (sectionEl) {
        observer.unobserve(sectionEl);
      }
    };
  });
</script>

<svelte:window onkeydown={handleKeyDown} />

<section 
  id="portfolio" 
  bind:this={sectionEl}
  class="py-20 bg-[#0A0A0A] relative overflow-hidden"
>
  <div class="container mx-auto px-6 lg:px-16 relative z-10">
    <!-- Header -->
    <h2 
      class="text-4xl lg:text-5xl font-extrabold text-center mb-8 text-white tracking-tight transition-all duration-1000 ease-out transform
      {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}"
    >
      Portofolio <span class="text-[#00D1B2]">Karya Kami</span>
    </h2>

    <!-- Tabs Navigation -->
    <div 
      class="flex justify-center gap-4 mb-16 transition-all duration-1000 ease-out transform
      {isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}"
      style="transition-delay: 150ms;"
    >
      <button
        type="button"
        onclick={() => activeTab = 'compro'}
        class="px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border cursor-pointer
        {activeTab === 'compro' 
          ? 'bg-[#00D1B2] text-[#0A0A0A] border-[#00D1B2] shadow-[0_0_15px_rgba(0,209,178,0.25)]' 
          : 'bg-transparent text-white border-white/20 hover:border-white/55'}"
      >
        Desain Company Profile
      </button>
      <button
        type="button"
        onclick={() => activeTab = 'web'}
        class="px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border cursor-pointer
        {activeTab === 'web' 
          ? 'bg-[#00D1B2] text-[#0A0A0A] border-[#00D1B2] shadow-[0_0_15px_rgba(0,209,178,0.25)]' 
          : 'bg-transparent text-white border-white/20 hover:border-white/55'}"
      >
        Website Corporate
      </button>
    </div>

    <!-- Portfolio Grid -->
    <div 
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ease-out transform
      {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}"
      style="transition-delay: 300ms;"
    >
      {#each displayedItems as item (item.id)}
        <button
          type="button"
          onclick={() => openModal(item.src, `${item.title} - ${item.category}`, item.url || null)}
          class="group relative w-full h-[300px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left transition-all duration-300 hover:scale-[1.02] hover:border-[#00D1B2]/50 shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#00D1B2]"
        >
          <img
            src={item.src}
            alt={`${item.title} - ${item.category}`}
            loading="lazy"
            class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end justify-between p-6">
            <div>
              <p class="text-sm text-[#00D1B2] font-bold mb-1">{item.title}</p>
              <p class="text-xs text-gray-300 font-medium">{item.category}</p>
            </div>
            <div class="bg-[#00D1B2]/80 text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-md">
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
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-md cursor-zoom-out"
    >
      <button
        type="button"
        onclick={closeModal}
        aria-label="Tutup modal"
        class="fixed top-6 right-6 z-[60] text-white/70 hover:text-white bg-black/40 hover:bg-white/10 backdrop-blur-sm p-3 rounded-full transition-all duration-200"
      >
        <X size={28} />
      </button>

      <div
        transition:scale={{ duration: 250, start: 0.9 }}
        onclick={(e) => e.stopPropagation()}
        role="presentation"
        class="relative w-full max-w-5xl mx-auto my-auto flex flex-col items-center gap-4"
      >
        <img
          src={selectedImage}
          alt={selectedAlt}
          class="w-full h-auto max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
        />
        {#if selectedUrl}
          <a
            href={selectedUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="bg-[#00D1B2] text-[#0A0A0A] px-8 py-3 rounded-full font-bold hover:shadow-[0_0_20px_rgba(0,209,178,0.5)] transition-all duration-300 cursor-pointer flex items-center gap-2 hover:scale-105 text-center text-sm"
          >
            Kunjungi Website Resmi
          </a>
        {/if}
      </div>
    </div>
  {/if}

  <!-- Background Accents -->
  <div class="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
    <div class="absolute top-1/4 -right-20 w-96 h-96 bg-[#00D1B2]/10 rounded-full blur-[120px]"></div>
    <div class="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#00D1B2]/5 rounded-full blur-[120px]"></div>
  </div>
</section>
