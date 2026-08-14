<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';

  let isVisible = $state(false);
  let sectionEl: HTMLElement | null = $state(null);

  // Seluruh daftar logo format WebP (dibersihkan dari file background dan menggunakan nama file bersih)
  const rawLogos = [
    '1.webp', '28_mei_2025_tvshop_logo_01.webp', 'bandar_pohon_indonesia.webp',
    'chatgpt_image_aug_2_2026_08_55_40_pm.webp', 'chatgpt_image_aug_4_2026_07_48_22_pm.webp',
    'chatgpt_image_jul_10_2026_09_04_34_am.webp', 'chatgpt_image_jul_13_2026_07_26_25_pm.webp',
    'chatgpt_image_jul_14_2026_08_43_20_pm.webp', 'chatgpt_image_jul_15_2026_03_37_44_pm.webp',
    'chatgpt_image_jul_3_2026_08_11_25_pm.webp', 'chatgpt_image_jul_6_2026_09_06_51_pm.webp',
    'chatgpt_image_jul_6_2026_12_44_10_pm.webp', 'chatgpt_image_jul_7_2026_09_00_12_am.webp',
    'chatgpt_image_jun_19_2026_01_01_27_pm.webp', 'gemini_generated_image_2e76p42e76p42e76_dup.webp',
    'jabe.webp', 'logo_1.webp', 'logo_1_dup.webp', 'logo_2.webp', 'logo_2_dup.webp',
    'logo_3.webp', 'logo_4.webp', 'logo_5.webp', 'logo_6.webp', 'logo_7.webp',
    'logo_abi.webp', 'logo_agung_phinisi.webp', 'logo_altara.webp', 'logo_bps.webp',
    'logo_cv_ntx_transparan.webp', 'logo_dup.webp', 'logo_enka_tour_2368px_x_1082px.webp',
    'logo_font_white_bg.webp', 'logo_kag_1.webp', 'logo_kencana.webp',
    'logo_marsindo_landscpae_4x.webp', 'logo_nds_1.webp', 'logo_png_01.webp',
    'logo_prmi_1_1.webp', 'logo_pt_abyar_mitra_utama.webp', 'logo_pt_royal_mahligai_gold.webp',
    'logo_punggawa_konsultan_fix.webp', 'logo_sat_2.webp', 'logo_sekunder_fjb_png_artboard_6.webp',
    'logo_sjm.webp', 'logo_tanpa_background.webp', 'logo_transparan.webp',
    'logo_transparan_new.webp', 'logo_transparant.webp', 'logo_tridaya_sinergi_perkasa_1.webp',
    'logo_vertical.webp', 'new_logo.webp', 'vertical_dup.webp',
    'whatsapp_image_2026_07_17_at_13.22.11.webp', 'whatsapp_image_2026_07_18_at_12.17.49.webp'
  ];

  // Map ke path direktori statis dengan URL encoding yang aman
  const allLogos = rawLogos.map(name => `${base}/client-logo/${encodeURIComponent(name)}`);

  // Bagi rata menjadi 3 baris
  const row1 = allLogos.slice(0, 18);
  const row2 = allLogos.slice(18, 36);
  const row3 = allLogos.slice(36);

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
  id="clients" 
  bind:this={sectionEl}
  class="py-20 bg-transparent relative overflow-hidden"
>
  <div class="container mx-auto px-6 lg:px-16 relative z-10">
    <div class="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-center">
      <!-- Left Column: Client Appreciation Layout Image -->
      <div 
        class="w-full lg:w-[40%] flex items-center justify-center transform transition-all duration-1000 ease-out
        {isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}"
      >
        <img
          src="{base}/KV_KLIEN.webp"
          alt="Berbagai Bidang Industri Telah Kami Tangani - Jago Compro"
          loading="lazy"
          class="w-full h-auto max-w-sm sm:max-w-md lg:max-w-none object-contain rounded-3xl shadow-2xl border border-white/10"
        />
      </div>

      <!-- Right Column: Logos and Text -->
      <div 
        class="w-full lg:w-[60%] flex flex-col justify-center transform transition-all duration-1000 ease-out overflow-hidden
        {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}"
        style="transition-delay: 200ms;"
      >
        <h2 class="text-3xl lg:text-4xl font-extrabold text-white mb-6 tracking-tight leading-tight text-center lg:text-left">
          Telah Dipercaya oleh <span class="text-[#00D1B2]">Ratusan Klien</span>
        </h2>
        <p class="text-gray-300 text-base leading-relaxed mb-10 text-center lg:text-left">
          Dari startup, UMKM, hingga korporasi besar, kami membantu merancang identitas visual, company profile, dan menghadirkan website bisnis yang berkelas untuk mendukung perkembangan usaha mereka.
        </p>

        <!-- Infinite Scrolling Logo Marquees (3 Rows) -->
        <div class="flex flex-col gap-4 w-full relative">
          
          <!-- Row 1: Left Scroll -->
          <div class="overflow-hidden w-full relative mask-gradient">
            <div class="animate-marquee gap-5 py-1">
              {#each row1 as logo}
                <div class="flex items-center justify-center h-14 w-28 shrink-0 bg-white rounded-xl shadow-xs border border-white/20 p-2 hover:scale-105 hover:shadow-md transition-transform duration-200">
                  <img src={logo} alt="Logo Klien" loading="lazy" class="max-w-full max-h-full object-contain" />
                </div>
              {/each}
              <!-- Duplication for seamless infinite looping -->
              {#each row1 as logo}
                <div class="flex items-center justify-center h-14 w-28 shrink-0 bg-white rounded-xl shadow-xs border border-white/20 p-2 hover:scale-105 hover:shadow-md transition-transform duration-200">
                  <img src={logo} alt="Logo Klien" loading="lazy" class="max-w-full max-h-full object-contain" />
                </div>
              {/each}
            </div>
          </div>

          <!-- Row 2: Right Scroll (Reverse) -->
          <div class="overflow-hidden w-full relative mask-gradient">
            <div class="animate-marquee-reverse gap-5 py-1">
              {#each row2 as logo}
                <div class="flex items-center justify-center h-14 w-28 shrink-0 bg-white rounded-xl shadow-xs border border-white/20 p-2 hover:scale-105 hover:shadow-md transition-transform duration-200">
                  <img src={logo} alt="Logo Klien" loading="lazy" class="max-w-full max-h-full object-contain" />
                </div>
              {/each}
              <!-- Duplication for seamless infinite looping -->
              {#each row2 as logo}
                <div class="flex items-center justify-center h-14 w-28 shrink-0 bg-white rounded-xl shadow-xs border border-white/20 p-2 hover:scale-105 hover:shadow-md transition-transform duration-200">
                  <img src={logo} alt="Logo Klien" loading="lazy" class="max-w-full max-h-full object-contain" />
                </div>
              {/each}
            </div>
          </div>

          <!-- Row 3: Left Scroll -->
          <div class="overflow-hidden w-full relative mask-gradient">
            <div class="animate-marquee gap-5 py-1">
              {#each row3 as logo}
                <div class="flex items-center justify-center h-14 w-28 shrink-0 bg-white rounded-xl shadow-xs border border-white/20 p-2 hover:scale-105 hover:shadow-md transition-transform duration-200">
                  <img src={logo} alt="Logo Klien" loading="lazy" class="max-w-full max-h-full object-contain" />
                </div>
              {/each}
              <!-- Duplication for seamless infinite looping -->
              {#each row3 as logo}
                <div class="flex items-center justify-center h-14 w-28 shrink-0 bg-white rounded-xl shadow-xs border border-white/20 p-2 hover:scale-105 hover:shadow-md transition-transform duration-200">
                  <img src={logo} alt="Logo Klien" loading="lazy" class="max-w-full max-h-full object-contain" />
                </div>
              {/each}
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* Efek mask gradient transparan di pinggir kiri dan kanan */
  .mask-gradient {
    mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
  }

  @keyframes marquee {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @keyframes marquee-reverse {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0%);
    }
  }

  .animate-marquee {
    display: flex;
    width: max-content;
    animation: marquee 50s linear infinite;
  }

  .animate-marquee-reverse {
    display: flex;
    width: max-content;
    animation: marquee-reverse 50s linear infinite;
  }

  /* Jeda scroll saat di-hover */
  .animate-marquee:hover, .animate-marquee-reverse:hover {
    animation-play-state: paused;
  }
</style>
