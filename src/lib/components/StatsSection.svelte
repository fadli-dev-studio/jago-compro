<script lang="ts">
  import { onMount } from 'svelte';

  let isVisible = $state(false);
  let sectionEl: HTMLElement | null = $state(null);

  // Data Statistik
  const stats = [
    {
      value: "55+",
      label: "Klien Korporat & UMKM",
      description: "Telah mempercayakan legalitas, compro, dan website mereka kepada kami."
    },
    {
      value: "150+",
      label: "Proyek Selesai",
      description: "Portofolio karya desain compro cetak, e-compro, dan website corporate."
    },
    {
      value: "100%",
      label: "Desain Orisinal",
      description: "Dibuat khusus dari awal sesuai brief, tanpa template pasaran."
    },
    {
      value: "24/7",
      label: "Konsultasi Responsif",
      description: "Tim support kami siap membantu kebutuhan bisnis Anda kapan saja."
    }
  ];

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

<section 
  bind:this={sectionEl}
  class="py-12 bg-[#0A0A0A] relative overflow-hidden"
>
  <div class="container mx-auto px-6 lg:px-16 relative z-10">
    <!-- Stats Grid Wrapper -->
    <div 
      class="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm transition-all duration-1000 ease-out transform
      {isVisible ? 'opacity-100 translate-y-0 scale-100 shadow-[0_10px_30px_rgba(0,0,0,0.3)]' : 'opacity-0 translate-y-10 scale-98'}"
    >
      {#each stats as stat, index}
        <div 
          class="flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-300 hover:bg-white/[0.02] group"
        >
          <!-- Glowing Counter/Value -->
          <span 
            class="text-4xl sm:text-5xl font-black text-[#00D1B2] mb-3 tracking-tight drop-shadow-[0_0_12px_rgba(0,209,178,0.3)] transition-transform duration-300 group-hover:scale-110"
          >
            {stat.value}
          </span>
          <!-- Label -->
          <h3 class="text-white font-bold text-sm sm:text-base mb-1 tracking-wide uppercase">
            {stat.label}
          </h3>
          <!-- Description -->
          <p class="text-gray-400 text-xs leading-relaxed max-w-[200px]">
            {stat.description}
          </p>
        </div>
        
        <!-- Vertical Divider (Desktop Only) -->
        {#if index < stats.length - 1}
          <div class="hidden lg:block w-[1px] h-16 bg-white/10 self-center"></div>
        {/if}
      {/each}
    </div>
  </div>
</section>
