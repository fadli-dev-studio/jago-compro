<script lang="ts">
  import { onMount } from 'svelte';
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import Autoplay from 'embla-carousel-autoplay';
  import { Quote, UserCircle } from '@lucide/svelte';

  let isVisible = $state(false);
  let sectionEl: HTMLElement | null = $state(null);

  // State untuk kontrol navigasi Embla Carousel
  let emblaApi = $state<any>(null);
  let selectedIndex = $state(0);
  let scrollSnaps = $state<number[]>([]);

  const testimonials = [
    {
      name: "Galih",
      company: "Pengusaha",
      quote: "Pengerjaannya cepat, sesuai brief, desainnya modern, mewah and sesuai dengan bisnis dan target marketnya. InsyaAllah langganan.",
    },
    {
      name: "Setiawan",
      company: "UMKM",
      quote: "Terimakasih Jago Compro. Kualitas dan pelayanan anda sangat baik. Recommended.",
    },
    {
      name: "Resti",
      company: "Startup",
      quote: "Terima kasih banyak atas bantuannya, semoga compro ini bisa bantu usaha saya sebagai jembatan informasi kepada calon konsumen kami.",
    },
    {
      name: "Kiki",
      company: "Online Shop",
      quote: "Sukses selalu juga buat Jago Compro. Terima kasih atas doanya.",
    },
    {
      name: "Afdal",
      company: "Kontraktor",
      quote: "Semoga pelanggannya makin banyak & berkah. Terima kasih banyak, Pak.",
    },
    {
      name: "Fikri",
      company: "Retail",
      quote: "Makin sukses n jaya juga ya. Terimakasih Jago Compro.",
    },
    {
      name: "Ilham",
      company: "Servis",
      quote: "Mantap, lain waktu saya bisa order lagi. Terima kasih.",
    },
    {
      name: "Karen",
      company: "Konsultan",
      quote: "Moga semua lancar ya pak, terima kasih.",
    },
    {
      name: "Siti",
      company: "Catering",
      quote: "Desainnya sangat membantu meningkatkan citra bisnis saya di mata pelanggan.",
    },
    {
      name: "Ahmad",
      company: "Event Organizer",
      quote: "Layanan yang responsif dan hasil yang memuaskan. Akan kembali lagi untuk proyek selanjutnya.",
    },
  ];

  let emblaOptions = { loop: true };
  let emblaPlugins = [Autoplay({ delay: 3000, stopOnInteraction: false })];

  function onInit(event: CustomEvent) {
    emblaApi = event.detail;
    if (!emblaApi) return;
    scrollSnaps = emblaApi.scrollSnapList();
    emblaApi.on('select', () => {
      selectedIndex = emblaApi.selectedScrollSnap();
    });
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
  id="testimonials" 
  bind:this={sectionEl}
  class="py-20 bg-transparent relative overflow-hidden"
>
  <div class="container mx-auto px-6 lg:px-16 relative z-10">
    <!-- Header -->
    <h2 
      class="text-4xl lg:text-5xl font-extrabold text-center mb-16 text-white tracking-tight transition-all duration-1000 ease-out transform
      {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}"
    >
      Apa Kata Klien Kami?
    </h2>

    <!-- Carousel Container -->
    <div 
      class="relative max-w-7xl mx-auto transition-all duration-1000 ease-out transform
      {isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}"
      style="transition-delay: 200ms;"
    >
      <div
        class="overflow-hidden cursor-grab active:cursor-grabbing"
        use:emblaCarouselSvelte={{ options: emblaOptions, plugins: emblaPlugins }}
        {...{ onembla: onInit }}
      >
        <div class="flex -ml-4">
          {#each testimonials as testimonial}
            <div class="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 pl-4">
              <div class="testimonial-card h-full p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-xl flex flex-col justify-between text-left cursor-pointer">
                <div class="relative text-white">
                  <Quote size={48} class="absolute -top-4 -left-4 text-white/5 z-0" />
                  <p class="text-gray-300 italic relative z-10 leading-relaxed text-sm sm:text-base">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
                <div class="border-t border-white/10 pt-4 mt-6 flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-gray-300 shrink-0">
                    <UserCircle size={32} class="text-gray-400" />
                  </div>
                  <div>
                    <h4 class="font-bold text-white text-base">{testimonial.name}</h4>
                    <p class="text-sm text-gray-400 font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Carousel Dots Navigation -->
      {#if scrollSnaps.length > 1}
        <div class="flex justify-center gap-2 mt-10">
          {#each scrollSnaps as _, i}
            <button
              type="button"
              onclick={() => emblaApi && emblaApi.scrollTo(i)}
              class="h-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none
              {selectedIndex === i ? 'w-6 bg-[#00D1B2]' : 'w-2 bg-white/20 hover:bg-white/40'}"
              aria-label={`Buka testimoni slide ${i + 1}`}
            ></button>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .testimonial-card {
    transition: all 400ms ease-out;
  }

  .testimonial-card:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 255, 255, 0.3);
    background-color: rgba(255, 255, 255, 0.08);
    box-shadow: 0 15px 35px -10px rgba(255, 255, 255, 0.15);
  }
</style>
