<script lang="ts">
  import { onMount } from 'svelte';
  import { siteConfig } from '$lib/config/site';
  import { trackEvent } from '$lib/gtag';

  let isVisible = $state(false);
  let sectionEl: HTMLElement | null = $state(null);

  function handleServiceClick(serviceName: string) {
    trackEvent('click_whatsapp', {
      category: 'engagement',
      label: `service_card_${serviceName}`,
      fbEventName: 'Lead',
      fbParams: { source: serviceName }
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
  id="layanan" 
  bind:this={sectionEl}
  class="py-20 bg-[#0A0A0A] relative overflow-hidden"
>
  <div class="container mx-auto px-6 lg:px-16 relative z-10">
    <!-- Header -->
    <div 
      class="text-center mb-16 transition-all duration-1000 ease-out transform
      {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}"
    >
      <h2 class="text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">Layanan Kami</h2>
      <p class="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
        Bisnis yang profesional dibangun dari fondasi yang tepat! Legalitas, branding, dan kehadiran digital. Kami menghadirkan solusi terintegrasi untuk membantu bisnis Anda tampil lebih terpercaya dan siap berkembang.
      </p>
    </div>

    <!-- Service Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <!-- Card 1: Legalitas -->
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onclick={() => handleServiceClick('legalitas')}
        class="flex items-center justify-center cursor-pointer transform transition-all duration-1000 ease-out
        {isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}"
        style="transition-delay: 100ms;"
      >
        <img
          src="/services/LEGAL.webp"
          alt="Layanan Legalitas"
          loading="lazy"
          class="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.03]"
          style="filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));"
        />
      </a>

      <!-- Card 2: Company Profile -->
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onclick={() => handleServiceClick('company_profile')}
        class="flex items-center justify-center cursor-pointer transform transition-all duration-1000 ease-out
        {isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}"
        style="transition-delay: 200ms;"
      >
        <img
          src="/services/COMPRO.webp"
          alt="Layanan Company Profile"
          loading="lazy"
          class="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.03]"
          style="filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));"
        />
      </a>

      <!-- Card 3: Website -->
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onclick={() => handleServiceClick('website')}
        class="flex items-center justify-center cursor-pointer transform transition-all duration-1000 ease-out
        {isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}"
        style="transition-delay: 300ms;"
      >
        <img
          src="/services/WEBSITE.webp"
          alt="Layanan Website"
          loading="lazy"
          class="w-full h-auto object-contain transition-transform duration-300 hover:scale-[1.03]"
          style="filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));"
        />
      </a>
    </div>

    <!-- Footer Text -->
    <div 
      class="text-center mb-12 transition-all duration-1000 ease-out transform
      {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}"
      style="transition-delay: 400ms;"
    >
      <p class="text-white text-lg font-medium mb-2">Layanan di atas merupakan layanan satuan.</p>
      <p class="text-gray-300">Untuk paket lengkap atau kebutuhan khusus, silakan konsultasi melalui WhatsApp.</p>
    </div>

    <!-- Badges -->
    <div 
      class="flex flex-wrap justify-center gap-4 lg:gap-8 transition-all duration-1000 ease-out transform
      {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}"
      style="transition-delay: 500ms;"
    >
      <div class="hover-icon-badge flex items-center gap-2 bg-white/5 px-5 py-2.5 rounded-full border border-white/10">
        <span class="text-[#00D1B2]">★</span>
        <span class="text-white text-sm">Gratis Materi/Pengembangan Narasi</span>
      </div>
      <div class="hover-icon-badge flex items-center gap-2 bg-white/5 px-5 py-2.5 rounded-full border border-white/10">
        <span class="text-[#00D1B2]">★</span>
        <span class="text-white text-sm">Gratis Konsultasi</span>
      </div>
      <div class="hover-icon-badge flex items-center gap-2 bg-[#00D1B2]/10 px-5 py-2.5 rounded-full border border-[#00D1B2]/30">
        <span class="text-[#00D1B2]">★</span>
        <span class="text-white text-sm font-bold">*Layanan Express 1 Hari (Extra 140K)</span>
      </div>
    </div>
  </div>

  <!-- Background Accents -->
  <div class="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
    <div class="absolute top-1/4 -left-20 w-96 h-96 bg-[#00D1B2]/10 rounded-full blur-[120px]"></div>
    <div class="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#00D1B2]/5 rounded-full blur-[120px]"></div>
  </div>
</section>
