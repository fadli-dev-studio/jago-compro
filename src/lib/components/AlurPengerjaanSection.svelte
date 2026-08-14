<script lang="ts">
  import { onMount } from 'svelte';
  import {
    MessageSquareText,
    FolderUp,
    Receipt,
    Cpu,
    Eye,
    FileCheck,
    Wallet,
    PackageCheck,
    Info,
    ArrowRight,
    ArrowDown,
    CornerDownLeft
  } from '@lucide/svelte';

  let isVisible = $state(false);
  let sectionEl: HTMLElement | null = $state(null);
  let hoveredStep = $state<number | null>(null);

  const steps = [
    {
      number: "01",
      title: "Konsultasi & Brief",
      desc: "Diskusikan kebutuhan, layanan/paket, konsep, serta estimasi pengerjaan.",
      icon: MessageSquareText
    },
    {
      number: "02",
      title: "Pengumpulan Data",
      desc: "Klien mengirimkan data, materi, dan informasi yang dibutuhkan untuk proses pengerjaan.",
      icon: FolderUp
    },
    {
      number: "03",
      title: "Invoice & DP 50%",
      desc: "Invoice diterbitkan sesuai layanan. Pengerjaan dimulai setelah DP 50% diterima.",
      icon: Receipt
    },
    {
      number: "04",
      title: "Proses Pengerjaan",
      desc: "Tim mulai mengerjakan proyek sesuai brief, paket, dan timeline yang disepakati.",
      icon: Cpu
    },
    {
      number: "05",
      title: "Review & Feedback",
      desc: "Hasil pekerjaan dikirimkan kepada klien untuk dilakukan pengecekan dan feedback.",
      icon: Eye
    },
    {
      number: "06",
      title: "Revisi & ACC",
      desc: "Dilakukan revisi sesuai ketentuan layanan hingga mendapatkan final approval.",
      icon: FileCheck
    },
    {
      number: "07",
      title: "Pelunasan",
      desc: "Setelah pekerjaan mendapatkan ACC, klien melakukan pelunasan sisa pembayaran 50%.",
      icon: Wallet
    },
    {
      number: "08",
      title: "Penyerahan File",
      desc: "Setelah pembayaran lunas, file final/master diserahkan sesuai paket pilihan.",
      icon: PackageCheck
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
  id="alur-pengerjaan" 
  bind:this={sectionEl}
  class="py-14 lg:py-16 bg-transparent relative overflow-hidden text-white"
>
  <div class="container mx-auto px-6 lg:px-16 relative z-10">
    <!-- Header Ringkas -->
    <div 
      class="text-center mb-10 transition-all duration-1000 ease-out transform
      {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}"
    >
      <h2 class="text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight">
        Alur <span class="text-[#00D1B2]">Pengerjaan</span>
      </h2>
      <p class="text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
        8 tahapan mudah dari konsultasi awal hingga penyerahan file final.
      </p>
    </div>

    <!-- Timeline Layout with Interconnected Arrows -->
    <div 
      class="mb-10 transition-all duration-1000 ease-out transform
      {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}"
      style="transition-delay: 150ms;"
    >
      <!-- ROW 1: Langkah 01 - 04 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 relative">
        {#each steps.slice(0, 4) as step, index}
          {@const globalIdx = index}
          {@const IconComp = step.icon}
          {@const isHovered = hoveredStep === globalIdx}
          
          <div 
            role="region"
            aria-label={`Langkah ${step.number}: ${step.title}`}
            class="relative group bg-white/3 hover:bg-white/8 border rounded-xl p-4.5 transition-all duration-300 flex flex-col justify-between cursor-pointer
            {isHovered ? 'border-[#00D1B2] shadow-[0_0_20px_rgba(0,209,178,0.15)] -translate-y-1' : 'border-white/10 hover:border-[#00D1B2]/50'}"
            onmouseenter={() => hoveredStep = globalIdx}
            onmouseleave={() => hoveredStep = null}
          >
            <div>
              <div class="flex items-center justify-between mb-3">
                <span 
                  class="text-xs font-bold px-2.5 py-0.5 rounded-md transition-colors duration-300
                  {isHovered ? 'bg-[#00D1B2] text-[#07090E]' : 'bg-[#00D1B2]/10 text-[#00D1B2] border border-[#00D1B2]/20'}"
                >
                  Langkah {step.number}
                </span>
                <div 
                  class="p-1.5 rounded-lg transition-colors duration-300
                  {isHovered ? 'bg-[#00D1B2]/20 text-[#00D1B2]' : 'text-gray-400 group-hover:text-[#00D1B2]'}"
                >
                  <IconComp size={18} />
                </div>
              </div>

              <h3 class="text-base font-bold text-white mb-1.5 transition-colors duration-200 {isHovered ? 'text-[#00D1B2]' : 'group-hover:text-[#00D1B2]'}">
                {step.title}
              </h3>

              <p class="text-gray-300 text-xs sm:text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>

            <!-- Desktop Horizontal Connector Arrow (between 01-02, 02-03, 03-04) -->
            {#if index < 3}
              <div class="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none items-center justify-center">
                <div 
                  class="w-7 h-7 rounded-full bg-[#07090E] border border-white/10 flex items-center justify-center shadow-md transition-all duration-300
                  {hoveredStep === globalIdx ? 'border-[#00D1B2] text-[#00D1B2] scale-125 bg-[#00D1B2]/10' : 'text-gray-400'}"
                >
                  <ArrowRight size={13} class="transition-transform duration-300 {hoveredStep === globalIdx ? 'translate-x-0.5' : ''}" />
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>

      <!-- Desktop Connecting Flow Connector between Row 1 (04) & Row 2 (05) -->
      <div class="hidden lg:flex items-center justify-end pr-10 py-3 relative z-10">
        <div 
          class="flex items-center gap-2 text-xs font-semibold px-3.5 py-1 rounded-full border transition-all duration-300
          {hoveredStep === 3 || hoveredStep === 4 ? 'border-[#00D1B2] text-[#00D1B2] bg-[#00D1B2]/10 shadow-[0_0_12px_rgba(0,209,178,0.2)]' : 'border-white/10 text-gray-400 bg-white/5'}"
        >
          <span>Lanjut ke Tahap 05</span>
          <ArrowDown size={14} class="animate-bounce text-[#00D1B2]" />
        </div>
      </div>

      <!-- Mobile/Tablet Divider Spacing -->
      <div class="lg:hidden h-4"></div>

      <!-- ROW 2: Langkah 05 - 08 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 relative">
        {#each steps.slice(4, 8) as step, index}
          {@const globalIdx = index + 4}
          {@const IconComp = step.icon}
          {@const isHovered = hoveredStep === globalIdx}

          <div 
            role="region"
            aria-label={`Langkah ${step.number}: ${step.title}`}
            class="relative group bg-white/3 hover:bg-white/8 border rounded-xl p-4.5 transition-all duration-300 flex flex-col justify-between cursor-pointer
            {isHovered ? 'border-[#00D1B2] shadow-[0_0_20px_rgba(0,209,178,0.15)] -translate-y-1' : 'border-white/10 hover:border-[#00D1B2]/50'}"
            onmouseenter={() => hoveredStep = globalIdx}
            onmouseleave={() => hoveredStep = null}
          >
            <div>
              <div class="flex items-center justify-between mb-3">
                <span 
                  class="text-xs font-bold px-2.5 py-0.5 rounded-md transition-colors duration-300
                  {isHovered ? 'bg-[#00D1B2] text-[#07090E]' : 'bg-[#00D1B2]/10 text-[#00D1B2] border border-[#00D1B2]/20'}"
                >
                  Langkah {step.number}
                </span>
                <div 
                  class="p-1.5 rounded-lg transition-colors duration-300
                  {isHovered ? 'bg-[#00D1B2]/20 text-[#00D1B2]' : 'text-gray-400 group-hover:text-[#00D1B2]'}"
                >
                  <IconComp size={18} />
                </div>
              </div>

              <h3 class="text-base font-bold text-white mb-1.5 transition-colors duration-200 {isHovered ? 'text-[#00D1B2]' : 'group-hover:text-[#00D1B2]'}">
                {step.title}
              </h3>

              <p class="text-gray-300 text-xs sm:text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>

            <!-- Desktop Horizontal Connector Arrow (between 05-06, 06-07, 07-08) -->
            {#if index < 3}
              <div class="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none items-center justify-center">
                <div 
                  class="w-7 h-7 rounded-full bg-[#07090E] border border-white/10 flex items-center justify-center shadow-md transition-all duration-300
                  {hoveredStep === globalIdx ? 'border-[#00D1B2] text-[#00D1B2] scale-125 bg-[#00D1B2]/10' : 'text-gray-400'}"
                >
                  <ArrowRight size={13} class="transition-transform duration-300 {hoveredStep === globalIdx ? 'translate-x-0.5' : ''}" />
                </div>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Inline Catatan Ringkas -->
    <div 
      class="max-w-3xl mx-auto bg-white/3 border border-white/10 rounded-xl px-5 py-3.5 flex items-center justify-center gap-3 text-center sm:text-left transition-all duration-1000 ease-out transform
      {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}"
      style="transition-delay: 300ms;"
    >
      <Info size={18} class="text-[#00D1B2] shrink-0" />
      <p class="text-gray-300 text-xs sm:text-sm">
        <strong class="text-white font-semibold">Catatan:</strong> Timeline pengerjaan menyesuaikan kelengkapan data & feedback dari klien.
      </p>
    </div>
  </div>

  <!-- Background Accent Blobs -->
  <div class="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-75 bg-[#00D1B2]/5 rounded-full blur-[140px]"></div>
  </div>
</section>
