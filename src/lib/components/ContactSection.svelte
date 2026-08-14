<script lang="ts">
  import { base } from '$app/paths';
  import { siteConfig } from '$lib/config/site';
  import { trackEvent } from '$lib/gtag';
  import { MessageCircle } from '@lucide/svelte';

  const currentYear = new Date().getFullYear();

  const CONTACT_PARAMS = {
    whatsapp: {
      href: siteConfig.whatsappUrl,
      label: "Hubungi via WhatsApp",
    },
    socials: [
      {
        href: siteConfig.socials.facebook,
        label: "Facebook JagoCompro",
        type: "facebook"
      },
      {
        href: siteConfig.socials.instagram,
        label: "Instagram JagoCompro",
        type: "instagram"
      },
    ],
    links: {
      layanan: [
        { label: "Layanan Kami", href: "#layanan" },
        { label: "Portofolio", href: "#portfolio" },
        { label: "Klien Kami", href: "#clients" },
      ],
      perusahaan: [
        { label: "Mengapa Kami", href: "#why-choose-us" },
        { label: "Testimoni", href: "#testimonials" },
        { label: "Tim Kami", href: "#team" },
        { label: "FAQ", href: "#faq" },
      ],
    },
  };

  function handleWhatsappClick() {
    trackEvent("click_whatsapp", {
      category: "engagement",
      label: "footer_whatsapp_button",
      fbEventName: "Lead",
      fbParams: { source: "footer" },
    });
  }

  function handleSocialClick(name: string) {
    trackEvent("click_social_media", {
      category: "engagement",
      label: `footer_${name}_button`,
      fbEventName: "Lead",
      fbParams: { source: "footer" },
    });
  }
</script>

<footer id="contact" class="bg-[#0A0A0A] text-white relative overflow-hidden border-t border-white/5">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
    <!-- CTA Section Card (Transparent Glassmorphic Island) -->
    <div class="bg-[#0A0A0A]/70 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 mb-12 flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl shadow-black/60 relative overflow-hidden group">
      <!-- Ambient interior glow -->
      <div class="absolute -top-20 -right-20 w-72 h-72 bg-[#00D1B2]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="relative z-10 text-center md:text-left">
        <h3 class="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Tertarik <span class="text-[#00D1B2]">Bekerja Sama?</span>
        </h3>
        <p class="mt-2 text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
          Konsultasikan kebutuhan desain company profile Anda bersama tim profesional kami.
        </p>
      </div>

      <a
        href={CONTACT_PARAMS.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        onclick={handleWhatsappClick}
        title={CONTACT_PARAMS.whatsapp.label}
        class="relative z-10 inline-flex items-center gap-2.5 bg-[#00D1B2]/10 hover:bg-[#00D1B2] text-[#00D1B2] hover:text-[#0A0A0A] border border-[#00D1B2]/40 hover:border-[#00D1B2] font-bold px-6 sm:px-7 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-[#00D1B2]/10 shrink-0 text-sm sm:text-base cursor-pointer"
      >
        <MessageCircle size={20} class="animate-pulse" />
        <span>{CONTACT_PARAMS.whatsapp.label}</span>
      </a>
    </div>

    <!-- Footer Grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-8">
      <!-- Logo & Description -->
      <div class="col-span-2 lg:col-span-2">
        <a href="/" class="inline-block mb-3" aria-label="Beranda JagoCompro">
          <picture>
            <source srcset="{base}/logo-jc.webp" type="image/webp" />
            <img
              src="{base}/logo-jc.png"
              alt="Logo Jago Compro"
              class="h-9 sm:h-11 w-auto object-contain"
            />
          </picture>
        </a>
        <p class="mt-2 text-sm font-semibold text-slate-300">CV. Langit Karya Tadulako</p>
        <p class="mt-1 text-sm text-slate-400 max-w-sm">Membantu bisnis Anda tampil lebih profesional.</p>
      </div>

      <!-- Layanan -->
      <div>
        <h4 class="font-bold text-white mb-4 text-base">Layanan</h4>
        <ul class="space-y-2.5 text-sm text-slate-300">
          {#each CONTACT_PARAMS.links.layanan as link}
            <li>
              <a href={link.href} class="hover:text-emerald-400 transition-colors">
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Perusahaan -->
      <div>
        <h4 class="font-bold text-white mb-4 text-base">Perusahaan</h4>
        <ul class="space-y-2.5 text-sm text-slate-300">
          {#each CONTACT_PARAMS.links.perusahaan as link}
            <li>
              <a href={link.href} class="hover:text-emerald-400 transition-colors">
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
      <p class="text-sm text-slate-400 text-center sm:text-left">
        &copy; {currentYear} <strong class="text-white">Jago-COMPRO</strong>. Semua Hak Cipta Dilindungi.
      </p>
      <div class="flex gap-4">
        {#each CONTACT_PARAMS.socials as social}
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            onclick={() => handleSocialClick(social.label)}
            aria-label={social.label}
            title={social.label}
            class="text-slate-400 hover:text-emerald-400 transition-colors p-2 rounded-lg hover:bg-slate-800"
          >
            {#if social.type === 'facebook'}
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            {:else if social.type === 'instagram'}
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            {/if}
          </a>
        {/each}
      </div>
    </div>
  </div>
</footer>
