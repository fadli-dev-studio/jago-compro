<script lang="ts">
  import { base } from '$app/paths';
  import { siteConfig } from '$lib/config/site';
  import { trackEvent } from '$lib/gtag';
  import { Menu, X, Zap } from '@lucide/svelte';
  import { slide } from 'svelte/transition';

  let isMenuOpen = $state(false);

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  function handleWhatsappClick(source: string) {
    trackEvent('click_whatsapp', {
      category: 'engagement',
      label: 'navbar_whatsapp_button',
      fbEventName: 'Lead',
      fbParams: { source }
    });
  }

  function handleExpressClick(source: string) {
    trackEvent('click_whatsapp', {
      category: 'engagement',
      label: 'navbar_express_button',
      fbEventName: 'Lead',
      fbParams: { source }
    });
  }
</script>

<nav class="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-4 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
  <div class="w-full max-w-7xl bg-[#0A0A0A]/70 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-full py-2 sm:py-2.5 px-4 sm:px-6 lg:px-8 shadow-2xl shadow-black/60 pointer-events-auto flex items-center justify-between transition-all duration-300">
    <div class="flex items-center justify-between w-full">
      <!-- Logo -->
      <div class="shrink-0">
        <a href="/" aria-label="Beranda JagoCompro" class="block">
          <picture>
            <source srcset="{base}/logo-jc.webp" type="image/webp" />
            <img
              src="{base}/logo-jc.png"
              alt="Logo JagoCompro"
              class="h-9 sm:h-10 w-auto object-contain"
            />
          </picture>
        </a>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden sm:flex sm:items-center sm:ml-6">
        <ul class="flex space-x-4">
          {#each siteConfig.navItems as item}
            <li>
              <a
                href={item.href}
                class="text-slate-300 hover:text-emerald-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                aria-label={item.label}
              >
                {item.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- CTA Buttons + Mobile Toggle -->
      <div class="flex items-center gap-3">
        <!-- Express CTA (Desktop) -->
        <div class="hidden md:flex shrink-0">
          <a
            href={siteConfig.whatsappExpressUrl}
            target="_blank"
            rel="noopener noreferrer"
            onclick={() => handleExpressClick('navbar_desktop')}
            class="btn-express-attention bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-full hover:scale-105 transition-all duration-200 flex items-center gap-1.5 group/express"
          >
            <span class="express-shine-bar"></span>
            <Zap size={14} class="fill-slate-950 text-slate-950 icon-zap-flash shrink-0" />
            <span class="relative z-10">Desain Compro Express 1 Hari</span>
          </a>
        </div>

        <!-- WhatsApp CTA (Desktop) -->
        <div class="hidden lg:flex shrink-0">
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onclick={() => handleWhatsappClick('navbar_desktop')}
            class="bg-[#00D1B2]/10 hover:bg-[#00D1B2] text-[#00D1B2] hover:text-[#0A0A0A] border border-[#00D1B2]/40 font-bold text-xs sm:text-sm px-4 py-2 rounded-full transition-all duration-200"
          >
            Konsultasi
          </a>
        </div>

        <!-- Hamburger Menu (Mobile) -->
        <div class="flex sm:hidden ml-2">
          <button
            type="button"
            onclick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
            class="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-white"
          >
            {#if isMenuOpen}
              <X size={24} />
            {:else}
              <Menu size={24} />
            {/if}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if isMenuOpen}
    <div
      transition:slide={{ duration: 250 }}
      id="mobile-menu"
      class="sm:hidden bg-[#0E121D]/95 backdrop-blur-xl border border-white/10 rounded-2xl mt-2 p-4 pointer-events-auto shadow-2xl"
    >
      <ul class="px-4 py-4 space-y-2">
        {#each siteConfig.navItems as item}
          <li>
            <a
              href={item.href}
              onclick={closeMenu}
              class="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
            >
              {item.label}
            </a>
          </li>
        {/each}
        <li class="pt-2">
          <a
            href={siteConfig.whatsappExpressUrl}
            target="_blank"
            rel="noopener noreferrer"
            onclick={() => {
              handleExpressClick('navbar_mobile');
              closeMenu();
            }}
            class="btn-express-attention w-full flex items-center justify-center gap-2 bg-linear-to-r from-amber-400 to-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-full transition-colors text-sm group/express"
          >
            <span class="express-shine-bar"></span>
            <Zap size={16} class="fill-slate-950 text-slate-950 icon-zap-flash shrink-0" />
            <span class="relative z-10">Desain Compro Express 1 Hari</span>
          </a>
        </li>
        <li>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onclick={() => {
              handleWhatsappClick('navbar_mobile');
              closeMenu();
            }}
            class="mt-2 w-full block text-center btn-glow bg-[#00D1B2] text-[#0A0A0A] font-bold px-4 py-2.5 rounded-full transition-colors text-sm"
          >
            Konsultasi WhatsApp
          </a>
        </li>
      </ul>
    </div>
  {/if}
</nav>
