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

<nav class="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-20">
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
            class="bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm px-3.5 py-2 rounded-full shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105 transition-all duration-200 flex items-center gap-1.5"
          >
            <Zap size={14} class="fill-slate-950 text-slate-950" />
            <span>Desain Compro Express 1 Hari</span>
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
      class="sm:hidden bg-slate-900 border-t border-slate-800"
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
            class="w-full flex items-center justify-center gap-2 bg-linear-to-r from-amber-400 to-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-full shadow-md transition-colors text-sm"
          >
            <Zap size={16} class="fill-slate-950 text-slate-950" />
            <span>Desain Compro Express 1 Hari</span>
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
