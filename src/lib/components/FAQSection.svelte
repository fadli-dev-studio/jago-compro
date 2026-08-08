<script lang="ts">
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { Plus, Minus } from '@lucide/svelte';

  let isVisible = $state(false);
  let sectionEl: HTMLElement | null = $state(null);

  // Daftar pertanyaan & jawaban FAQ yang relevan
  const faqs = [
    {
      q: "Apa saja layanan utama yang ditawarkan oleh Jago COMPRO?",
      a: "Kami menawarkan layanan satu pintu (One Stop Solution) untuk kebutuhan bisnis Anda, meliputi pembuatan desain Company Profile (mewah & profesional), perancangan legalitas perusahaan (CV/PT resmi), hingga pembuatan Website Corporate berkecepatan tinggi yang responsif."
    },
    {
      q: "Berapa lama proses pengerjaan website atau company profile?",
      a: "Durasi pengerjaan bervariasi bergantung pada kompleksitas proyek. Umumnya, pembuatan Company Profile cetak memakan waktu 3-5 hari kerja, sedangkan untuk Website Corporate berkisar antara 7-14 hari kerja. Kami juga menyediakan layanan kilat (Express Design) bagi yang membutuhkan hasil cepat."
    },
    {
      q: "Apakah saya bisa mengajukan revisi jika desain kurang cocok?",
      a: "Tentu saja! Kepuasan klien adalah prioritas utama kami. Kami menyediakan kuota revisi gratis pada setiap paket layanan untuk memastikan hasil akhir company profile atau website benar-benar sesuai dengan visi bisnis Anda."
    },
    {
      q: "Bagaimana dengan biaya tahunan untuk website?",
      a: "Untuk website, terdapat biaya tahunan berupa perpanjangan domain (.com, .co.id, dll) dan hosting. Pada tahun pertama, biaya ini biasanya sudah termasuk (gratis) di dalam paket pembuatan awal kami. Di tahun berikutnya, Anda hanya membayar biaya perpanjangan domain & hosting yang sangat terjangkau."
    },
    {
      q: "Apakah website yang dibuat sudah SEO-Friendly dan mobile-responsive?",
      a: "Ya, 100%. Semua website yang kami bangun dirancang menggunakan struktur kode terbaik yang ramah SEO (Search Engine Optimization) agar lebih mudah ditemukan di Google. Selain itu, tampilan website dijamin responsif dan terlihat sempurna di smartphone, tablet, maupun desktop."
    },
    {
      q: "Bagaimana cara memulai kerja sama dengan Jago COMPRO?",
      a: "Sangat mudah! Anda hanya perlu mengklik tombol 'Konsultasi Sekarang' atau menghubungi kami via WhatsApp. Tim kami akan berdiskusi singkat dengan Anda mengenai kebutuhan bisnis, konsep desain, serta memberikan rekomendasi paket terbaik untuk Anda."
    }
  ];

  // State untuk melacak indeks FAQ yang sedang terbuka
  let openIndex = $state<number | null>(null);

  function toggleFaq(index: number) {
    if (openIndex === index) {
      openIndex = null;
    } else {
      openIndex = index;
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

<section 
  id="faq" 
  bind:this={sectionEl}
  class="py-20 bg-[#0A0A0A] relative overflow-hidden"
>
  <div class="container mx-auto px-6 lg:px-16 relative z-10">
    <!-- Header -->
    <div 
      class="text-center mb-16 transition-all duration-1000 ease-out transform
      {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}"
    >
      <h2 class="text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
        Pertanyaan <span class="text-[#00D1B2]">Sering Diajukan</span>
      </h2>
      <p class="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        Punya pertanyaan seputar layanan kami? Temukan jawaban cepat untuk beberapa pertanyaan umum di bawah ini.
      </p>
    </div>

    <!-- FAQ Accordion List -->
    <div class="max-w-3xl mx-auto flex flex-col gap-4">
      {#each faqs as faq, index}
        <div 
          class="border border-white/10 rounded-2xl bg-white/5 overflow-hidden transition-all duration-300
          {openIndex === index ? 'border-[#00D1B2]/40 bg-white/[0.08] shadow-[0_0_15px_rgba(0,209,178,0.05)]' : ''}"
        >
          <!-- Trigger Header -->
          <button
            type="button"
            onclick={() => toggleFaq(index)}
            class="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none transition-colors duration-200"
          >
            <span class="text-base sm:text-lg font-bold text-white pr-4 transition-colors duration-200
              {openIndex === index ? 'text-[#00D1B2]' : ''}"
            >
              {faq.q}
            </span>
            <span class="text-white flex-shrink-0 bg-white/10 p-1.5 rounded-full transition-all duration-300
              {openIndex === index ? 'bg-[#00D1B2] text-[#0A0A0A] rotate-180' : ''}"
            >
              {#if openIndex === index}
                <Minus size={18} />
              {:else}
                <Plus size={18} />
              {/if}
            </span>
          </button>

          <!-- Content Panel (Svelte transition:slide) -->
          {#if openIndex === index}
            <div 
              transition:slide={{ duration: 300 }}
              class="px-6 pb-6 text-gray-300 text-sm sm:text-base leading-relaxed border-t border-white/5 pt-4"
            >
              {faq.a}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>
