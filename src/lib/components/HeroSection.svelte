<script lang="ts">
  import { siteConfig } from '$lib/config/site';
  import { trackEvent } from '$lib/gtag';
  import { ArrowRight } from '@lucide/svelte';

  const ctaText = "Ready! Desain Express 1 Hari";

  function handleCtaClick() {
    trackEvent('click_whatsapp', {
      category: 'engagement',
      label: 'footer_whatsapp_button',
      fbEventName: 'Lead',
      fbParams: { source: 'hero' }
    });
  }
</script>

<div class="relative bg-[#0f172a] overflow-hidden">
  <img
    src="/background.webp"
    alt="Background pattern with abstract shapes"
    class="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
  />

  <section id="hero" class="relative z-10 text-white">
    <div class="container mx-auto px-6 lg:px-36 py-24 flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
      <!-- Left Text Column -->
      <div class="lg:w-1/2">
        <h1 class="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          Jasa Desain <br />
          <span class="text-emerald-400">Company Profile</span> Profesional
        </h1>

        <p class="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 mb-8">
          Company profile bukan sekadar formalitas, tapi alat penting untuk menunjukkan
          profesionalisme, membangun kepercayaan, dan menjelaskan bisnis Anda secara ringkas dan
          menarik.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <a
            href={siteConfig.whatsappExpressUrl}
            target="_blank"
            rel="noopener noreferrer"
            onclick={handleCtaClick}
            class="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-yellow-400/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{ctaText}</span>
            <ArrowRight size={20} />
          </a>
        </div>
      </div>

      <!-- Right Image Column -->
      <div class="lg:w-1/2 flex justify-center">
        <div class="relative transform hover:scale-[1.02] transition-transform duration-500">
          <img
            src="/KV.webp"
            alt="Mockup desain company profile modern dan profesional"
            width="800"
            height="450"
            class="w-full max-w-lg lg:max-w-none h-auto drop-shadow-[0_20px_50px_rgba(20,184,166,0.2)]"
          />
        </div>
      </div>
    </div>
  </section>
</div>
