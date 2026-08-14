<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { base } from '$app/paths';
  import { siteConfig } from '$lib/config/site';
  import { trackEvent } from '$lib/gtag';
  import { Menu, X, Sparkles, Zap } from '@lucide/svelte';

  let isMobileMenuOpen = $state(false);
  let mainText = $state('');
  let taglineText = $state('');
  let isCursorHidden = $state(false);
  let isAccordionOut = $state(false);
  let isContentRevealed = $state(false);

  let badgeEl: HTMLDivElement | null = $state(null);
  let transformStyle = $state('opacity: 0;');

  // State untuk animasi count-up statistik
  let clientCount = $state(0);
  let customCount = $state(0);
  let supportCount = $state(0);

  function animateValue(target: number, updateFn: (val: number) => void, duration: number) {
    const start = 0;
    const startTime = performance.now();

    function step(timestamp: number) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress); // Easing out quad
      const current = Math.floor(start + (target - start) * ease);
      
      updateFn(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  $effect(() => {
    if (isContentRevealed) {
      setTimeout(() => {
        animateValue(450, (val) => clientCount = val, 1600);
        animateValue(100, (val) => customCount = val, 1600);
        animateValue(24, (val) => supportCount = val, 1000);
      }, 400);
    }
  });

  const fullMainText = "One Stop Solution";
  const fullTaglineText = " • Dari Ide Menjadi Identitas";

  onMount(() => {
    // Set full combined text temporarily to measure exact target bounding rect
    mainText = fullMainText;
    taglineText = fullTaglineText;

    requestAnimationFrame(() => {
      if (badgeEl) {
        const rect = badgeEl.getBoundingClientRect();
        const offsetX = window.innerWidth / 2 - (rect.left + rect.width / 2);
        const offsetY = window.innerHeight / 2 - (rect.top + rect.height / 2);
        transformStyle = `transform: translate3d(${offsetX}px, ${offsetY}px, 0) scale(1.25); opacity: 1;`;
      }

      // Reset text to start typewriter effect
      mainText = '';
      taglineText = '';

      let i = 0;
      let j = 0;

      function typeMain() {
        if (i < fullMainText.length) {
          mainText += fullMainText.charAt(i);
          i++;
          setTimeout(typeMain, 30);
        } else {
          setTimeout(typeTagline, 100);
        }
      }

      function typeTagline() {
        if (j < fullTaglineText.length) {
          taglineText += fullTaglineText.charAt(j);
          j++;
          setTimeout(typeTagline, 30);
        } else {
          // Done typing: pause briefly, then trigger 1.2s smooth cinematic glide & accordion collapse
          setTimeout(() => {
            isCursorHidden = true;

            // Glide back to position over 1.2s
            transformStyle = 'transform: translate3d(0, 0, 0) scale(1); opacity: 1;';
            isAccordionOut = true;

            setTimeout(() => {
              isContentRevealed = true;
            }, 640);
          }, 500);
        }
      }

      setTimeout(typeMain, 150);
    });
  });

  let activeSection = $state('hero');

  onMount(() => {
    const sections = ['hero', 'why-choose-us', 'layanan', 'clients', 'client-map', 'testimonials', 'team', 'portfolio', 'faq', 'contact'];

    function handleScroll() {
      const scrollPosition = window.scrollY + 160; // offset untuk tinggi header

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            activeSection = sectionId;
            break;
          }
        }
      }
      
      // Fallback jika berada di paling atas
      if (window.scrollY < 50) {
        activeSection = 'hero';
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
  }

  function handleCtaClick() {
    trackEvent('click_whatsapp', {
      category: 'engagement',
      label: 'hero_whatsapp_button',
      fbEventName: 'Lead',
      fbParams: { source: 'hero' }
    });
  }

  function handleExpressClick() {
    trackEvent('click_whatsapp', {
      category: 'engagement',
      label: 'hero_whatsapp_express_button',
      fbEventName: 'Lead',
      fbParams: { source: 'navbar_express' }
    });
  }
</script>

<section id="hero" class="hero-section min-h-screen lg:h-screen lg:max-h-235 lg:min-h-160 relative flex flex-col justify-between pt-20 lg:pt-24 pb-6 lg:pb-4 overflow-hidden">
  <!-- Navigation Header (Floating Rounded Glass Island Navbar) -->
  <header class="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-4 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
    <div class="w-full max-w-7xl bg-[#0A0A0A]/70 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-full py-2 sm:py-2.5 px-4 sm:px-6 lg:px-8 shadow-2xl shadow-black/60 pointer-events-auto flex items-center justify-between transition-all duration-300">
      <!-- Logo Area -->
      <a href="/" class="flex items-center z-50 group shrink-0" aria-label="Beranda JagoCompro">
        <picture>
          <source srcset="{base}/logo-jc.webp" type="image/webp" />
          <img
            src="{base}/logo-jc.png"
            alt="Logo Jago Compro"
            class="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </picture>
      </a>

      <!-- Desktop Menu (Compact 6 items + Express CTA + Main CTA) -->
      <nav class="hidden lg:flex items-center gap-4 xl:gap-6">
        {#each siteConfig.navItems as item}
          <a 
            href={item.href} 
            class="nav-link font-medium inline-block text-xs xl:text-sm transition-colors duration-200
            {activeSection === (item.href === '#' ? 'hero' : item.href.replace('#', '')) ? 'text-[#00D1B2] font-bold text-glow' : 'text-gray-200 hover:text-[#00D1B2]'}"
          >
            {item.label}
          </a>
        {/each}

        <!-- Desain Compro Express 1 Hari Button -->
        <a
          href={siteConfig.whatsappExpressUrl}
          target="_blank"
          rel="noopener noreferrer"
          onclick={handleExpressClick}
          class="bg-linear-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-bold text-xs xl:text-sm px-3.5 py-1.5 rounded-full shadow-md shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105 transition-all duration-200 flex items-center gap-1.5 shrink-0"
        >
          <Zap size={14} class="fill-slate-950 text-slate-950" />
          <span>Desain Compro Express 1 Hari</span>
        </a>

        <!-- Konsultasi CTA -->
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onclick={handleCtaClick}
          class="bg-[#00D1B2]/10 hover:bg-[#00D1B2] text-[#00D1B2] hover:text-[#0A0A0A] border border-[#00D1B2]/40 font-bold text-xs xl:text-sm px-4 py-1.5 rounded-full transition-all duration-200 shrink-0"
        >
          Konsultasi
        </a>
      </nav>

      <!-- Mobile Menu Button (Hamburger) -->
      <button
        type="button"
        onclick={toggleMobileMenu}
        aria-label="Toggle menu"
        class="lg:hidden text-white focus:outline-none z-50 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
      >
        {#if isMobileMenuOpen}
          <X size={26} />
        {:else}
          <Menu size={26} />
        {/if}
      </button>
    </div>
  </header>

  <!-- Mobile Menu Drawer -->
  {#if isMobileMenuOpen}
    <div 
      transition:fade={{ duration: 200 }}
      class="lg:hidden fixed inset-0 bg-[#0A0A0A]/95 z-40 flex flex-col items-center justify-center space-y-5 text-base overflow-y-auto py-8 px-6"
    >
      {#each siteConfig.navItems as item}
        <a 
          href={item.href} 
          onclick={closeMobileMenu} 
          class="nav-link font-semibold {activeSection === (item.href === '#' ? 'hero' : item.href.replace('#', '')) ? 'text-[#00D1B2]' : 'text-white'}"
        >
          {item.label}
        </a>
      {/each}

      <!-- Express 1 Hari Mobile CTA -->
      <a
        href={siteConfig.whatsappExpressUrl}
        target="_blank"
        rel="noopener noreferrer"
        onclick={() => { handleExpressClick(); closeMobileMenu(); }}
        class="w-full max-w-xs text-center bg-linear-to-r from-amber-400 to-amber-500 text-slate-950 font-bold px-6 py-2.5 rounded-full flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 mt-2"
      >
        <Zap size={16} class="fill-slate-950 text-slate-950" />
        <span>Desain Compro Express 1 Hari</span>
      </a>

      <!-- Konsultasi Mobile CTA -->
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onclick={() => { handleCtaClick(); closeMobileMenu(); }}
        class="w-full max-w-xs text-center btn-glow bg-[#00D1B2] text-[#0A0A0A] font-bold px-8 py-2.5 rounded-full"
      >
        Konsultasi Sekarang!
      </a>
    </div>
  {/if}

  <!-- Hero Content Container -->
  <main class="container mx-auto px-6 lg:px-16 grow flex flex-col lg:flex-row items-center justify-between relative z-10 my-auto py-4">
    
    <!-- Left Column (Text & Badge) -->
    <div class="w-full lg:w-1/2 flex flex-col items-start justify-center z-20">
      
      <!-- Target Badge Slot with Tagline & 1.2s Accordion Collapse Animation -->
      <div class="relative mb-4 lg:mb-5 min-h-10 flex items-center justify-center">
        <div
          bind:this={badgeEl}
          style={transformStyle}
          class="bg-[#00D1B2] rounded-full px-4 sm:px-5 py-1.5 sm:py-2 flex items-center justify-center text-center gap-2 shadow-lg shadow-[#00D1B2]/40 transition-all duration-1200 cubic-bezier(0.16, 1, 0.3, 1) z-30 pointer-events-auto origin-center max-w-[95vw] overflow-hidden"
        >
          <!-- Modern WOW Sparkles Icon -->
          <div class="p-1 bg-[#0A0A0A]/15 rounded-full flex items-center justify-center shrink-0 animate-wow-pop">
            <Sparkles size={18} class="text-[#0A0A0A] animate-wow-icon" />
          </div>

          <!-- Main Badge Title -->
          <span class="text-[#0A0A0A] font-extrabold tracking-tight text-xs sm:text-sm md:text-base whitespace-nowrap text-center">
            {mainText || "\u00A0"}
          </span>

          <!-- Tagline Suffix with 1.2s Accordion Collapse Out to Left -->
          <div
            class="transition-all duration-1200 cubic-bezier(0.16, 1, 0.3, 1) overflow-hidden flex items-center origin-left
            {isAccordionOut ? 'max-w-0 opacity-0 scale-90 -ml-2' : 'max-w-90 opacity-100 scale-100 ml-0'}"
          >
            <span class="text-[#0A0A0A] font-bold text-xs sm:text-sm md:text-base whitespace-nowrap">
              {taglineText}
            </span>
          </div>

          {#if !isCursorHidden}
            <span class="inline-block w-0.5 h-4 sm:h-5 bg-[#0A0A0A] ml-0.5 animate-[blink_0.8s_step-end_infinite]"></span>
          {/if}
        </div>
      </div>

      <!-- Hero Main Content (Reveals smoothly after badge glides & accordion collapses) -->
      <div
        class="w-full flex flex-col items-start transition-all duration-700 ease-out transform {isContentRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}"
      >
        <!-- Main Headline -->
        <h1 class="text-3xl sm:text-4xl lg:text-4xl xl:text-[3.25rem] 2xl:text-[3.6rem] leading-[1.12] font-extrabold mb-4 sm:mb-5 tracking-tight">
          Jasa Desain Compro,<br />
          Legalitas &amp; Website<br />
          dalam <span class="text-[#00D1B2]">Satu Pintu!</span>
        </h1>

        <!-- Sub-headline/Description -->
        <p class="text-gray-300 text-sm sm:text-base lg:text-base xl:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg">
          Mulai dari nol hingga siap presentasi ke klien, kami membantu Anda mengurus <strong class="text-white">legalitas, desain logo, company profile, dan website bisnis</strong> dalam satu layanan yang praktis, profesional, dan terpercaya.
        </p>

        <!-- CTA Button -->
        <div>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onclick={handleCtaClick}
            class="btn-glow inline-block bg-[#00D1B2] text-[#0A0A0A] font-bold text-base sm:text-lg px-7 py-3 rounded-full"
          >
            Konsultasi Sekarang!
          </a>
        </div>
      </div>

    </div>

    <!-- Image Content (Right Side) -->
    <div
      class="w-full lg:w-1/2 mt-8 lg:mt-0 flex justify-center lg:justify-end relative z-10 pointer-events-none transition-all duration-800 ease-out transform {isContentRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}"
    >
      <!-- Floating Mockup Composition -->
      <div class="relative w-full max-w-120 lg:max-w-140 xl:max-w-155 animate-float">
        <img
          src="{base}/KV.webp"
          alt="Mockup Company Profile, Website, dan Dokumen Legalitas"
          loading="lazy"
          class="w-full h-auto object-contain"
          style="filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.45)) drop-shadow(0 0 35px rgba(0, 209, 178, 0.25));"
        />
      </div>
    </div>
  </main>

  <!-- Compact Stats Bar (3 Stats) -->
  <div 
    class="container mx-auto px-6 lg:px-16 relative z-10 mt-2 lg:mt-4 mb-4 lg:mb-4 transition-all duration-1000 ease-out transform
    {isContentRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-98'}"
    style="transition-delay: 400ms;"
  >
    <div class="w-full border-t border-white/10 pt-4 lg:pt-5">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
        <!-- Stat 1: Klien -->
        <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3 group justify-center sm:justify-start">
          <span class="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-black text-[#00D1B2] tracking-tight drop-shadow-[0_0_8px_rgba(0,209,178,0.25)] transition-transform duration-300 group-hover:scale-110 min-w-16.25 sm:min-w-18.75">
            {clientCount}+
          </span>
          <div class="flex flex-col">
            <span class="text-white font-bold text-xs uppercase tracking-wider">
              Klien Korporat & UMKM
            </span>
            <span class="text-gray-400 text-[10px] sm:text-xs leading-normal max-w-48 mx-auto sm:mx-0">
              Telah mempercayakan legalitas, compro, dan website mereka.
            </span>
          </div>
        </div>

        <!-- Stat 2: 100% Desain Custom -->
        <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3 group justify-center sm:justify-start">
          <span class="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-black text-[#00D1B2] tracking-tight drop-shadow-[0_0_8px_rgba(0,209,178,0.25)] transition-transform duration-300 group-hover:scale-110 min-w-16.25 sm:min-w-18.75">
            {customCount}%
          </span>
          <div class="flex flex-col">
            <span class="text-white font-bold text-xs uppercase tracking-wider">
              100% Desain Custom
            </span>
            <span class="text-gray-400 text-[10px] sm:text-xs leading-normal max-w-48 mx-auto sm:mx-0">
              Dibuat khusus dari awal sesuai kebutuhan dan Branding Perusahaan.
            </span>
          </div>
        </div>

        <!-- Stat 3: Konsultasi Responsif -->
        <div class="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-3 group justify-center sm:justify-start">
          <span class="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-black text-[#00D1B2] tracking-tight drop-shadow-[0_0_8px_rgba(0,209,178,0.25)] transition-transform duration-300 group-hover:scale-110 min-w-16.25 sm:min-w-18.75">
            {supportCount}/7
          </span>
          <div class="flex flex-col">
            <span class="text-white font-bold text-xs uppercase tracking-wider">
              Konsultasi Responsif
            </span>
            <span class="text-gray-400 text-[10px] sm:text-xs leading-normal max-w-48 mx-auto sm:mx-0">
              Tim support kami siap membantu kebutuhan bisnis Anda.
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Background Image -->
  <div class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none z-0" style="background-image: url('{base}/background.webp');"></div>

  <!-- Background overlays -->
  <div class="absolute inset-0 bg-linear-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent pointer-events-none z-0 lg:hidden"></div>
  <div class="absolute inset-0 bg-linear-to-r from-[#0A0A0A] via-[#0A0A0A]/95 to-transparent pointer-events-none z-0 hidden lg:block w-[60%]"></div>
</section>
