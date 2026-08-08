<script lang="ts">
  import { siteConfig } from '$lib/config/site';
  import { trackEvent } from '$lib/gtag';
  import { Menu, X } from '@lucide/svelte';
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
</script>

<nav class="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-20">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <a href="/" aria-label="Beranda JagoCompro" class="block">
          <img
            src="/logo-jago-compro.svg"
            alt="Logo JagoCompro"
            width="140"
            height="40"
            class="h-10 w-auto"
          />
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

      <!-- CTA Button + Mobile Toggle -->
      <div class="flex items-center">
        <!-- WhatsApp CTA (Desktop only) -->
        <div class="hidden lg:flex flex-shrink-0">
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onclick={() => handleWhatsappClick('navbar_desktop')}
            class="bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            Konsultasi WhatsApp
          </a>
        </div>

        <!-- Hamburger Menu (Mobile) -->
        <div class="flex sm:hidden ml-4">
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
        <li>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onclick={() => {
              handleWhatsappClick('navbar_mobile');
              closeMenu();
            }}
            class="mt-3 w-full block text-center bg-emerald-800 hover:bg-emerald-900 text-white font-semibold px-4 py-2 rounded-md transition-colors"
          >
            Konsultasi WhatsApp
          </a>
        </li>
      </ul>
    </div>
  {/if}
</nav>
