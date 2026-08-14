<script lang="ts">
  import { onMount } from 'svelte';
  import { MapPin } from '@lucide/svelte';
  import { indonesiaProvinces, clientCities, type CityLocation } from '$lib/data/indonesiaMap';

  let isVisible = $state(false);
  let sectionEl: HTMLElement | null = $state(null);

  // State untuk animasi count-up
  let citiesCount = $state(0);
  let provincesCount = $state(0);
  let activeCityId = $state<string | null>(null);
  let hoveredProvince = $state<string | null>(null);

  function animateValue(target: number, updateFn: (val: number) => void, duration: number) {
    const start = 0;
    const startTime = performance.now();

    function step(timestamp: number) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress);
      const current = Math.floor(start + (target - start) * ease);
      
      updateFn(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible = true;
          setTimeout(() => {
            animateValue(64, (val) => citiesCount = val, 1400);
            animateValue(27, (val) => provincesCount = val, 1400);
          }, 300);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

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
  id="client-map" 
  bind:this={sectionEl}
  class="py-20 bg-transparent relative overflow-hidden"
>
  <div class="container mx-auto px-6 lg:px-16 relative z-10">
    
    <!-- Content Grid (Direct container layout without enclosing card) -->
    <div 
      class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start transform transition-all duration-1000 ease-out
      {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}"
    >
      
      <!-- Left Column: Headline + SVG Map -->
      <div class="lg:col-span-8 flex flex-col">
        
        <!-- Header Area -->
        <div class="mb-6 lg:mb-8 text-center lg:text-left">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Klien Jago Compro<br />
            Tersebar di <span class="text-[#00D1B2]">Seluruh Indonesia</span>
          </h2>
          <p class="mt-3 text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
            Kami menangani proyek company profile, legalitas, dan website bisnis dari Aceh hingga Papua, dikerjakan secara profesional dan terstruktur dengan pelaporan berkala secara online.
          </p>
        </div>

        <!-- Interactive Vector Map Area -->
        <div class="relative w-full aspect-1000/440 bg-[#111422]/60 rounded-3xl border border-white/10 p-2 sm:p-4 overflow-hidden flex items-center justify-center shadow-2xl backdrop-blur-xs group/map">
          
          <!-- Map Grid Overlay -->
          <div class="absolute inset-0 opacity-15 bg-[radial-gradient(#00D1B2_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none"></div>

          <!-- SVG Vector Map of Indonesia -->
          <svg 
            viewBox="0 0 1000 440" 
            class="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)] select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <!-- Real Geo-Accurate Province / Island Paths -->
            <g class="transition-all duration-300">
              {#each indonesiaProvinces as prov}
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <path 
                  d={prov.d} 
                  class="transition-colors duration-200 cursor-pointer fill-[#1E2333] hover:fill-[#2A324B] stroke-[#2E354C] stroke-[0.8]"
                  stroke-linejoin="round" 
                  stroke-linecap="round"
                  onmouseenter={() => hoveredProvince = prov.name}
                  onmouseleave={() => hoveredProvince = null}
                >
                  <title>{prov.name}</title>
                </path>
              {/each}
            </g>

            <!-- Real Geographically Projected Location Pins and Radar Pulses -->
            {#each clientCities as city (city.id)}
              {@const isHovered = activeCityId === city.id}
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <g 
                class="cursor-pointer transition-all duration-300"
                onmouseenter={() => activeCityId = city.id}
                onmouseleave={() => activeCityId = null}
              >
                <!-- Expanding Pulse Ring for Key Hubs or Hovered Pin -->
                {#if city.isKeyHub || isHovered}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={isHovered ? "14" : "9"}
                    fill="none"
                    stroke={city.id === 'palu' ? '#10B981' : '#00D1B2'}
                    stroke-width={isHovered ? "2" : "1.5"}
                    opacity="0.8"
                    class="animate-ping origin-center"
                    style="transform-origin: {city.x}px {city.y}px;"
                  />
                {/if}

                <!-- Outer Glow Circle -->
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={isHovered ? "8" : (city.isKeyHub ? "5" : "3.5")}
                  fill={city.id === 'palu' ? '#10B981' : (isHovered ? '#00D1B2' : (city.isKeyHub ? '#00D1B2' : '#94A3B8'))}
                  fill-opacity={isHovered ? "0.4" : "0.25"}
                  class="transition-all duration-200"
                />

                <!-- Core Dot -->
                <circle
                  cx={city.x}
                  cy={city.y}
                  r={isHovered ? "4.5" : (city.isKeyHub ? "3" : "2")}
                  fill={city.id === 'palu' ? '#34D399' : (isHovered ? '#FFFFFF' : (city.isKeyHub ? '#00D1B2' : '#CBD5E1'))}
                  filter={isHovered || city.isKeyHub ? "url(#glow)" : undefined}
                  class="transition-all duration-200"
                />

                <!-- Interactive Tooltip Overlay in SVG -->
                {#if isHovered}
                  <g transform="translate({city.x}, {city.y - 12})" class="pointer-events-none transition-all duration-200 z-50">
                    <!-- Tooltip Background Box -->
                    <rect
                      x="-60"
                      y="-42"
                      width="120"
                      height="36"
                      rx="8"
                      fill="#0B0E17"
                      stroke="#00D1B2"
                      stroke-width="1.2"
                      filter="drop-shadow(0 6px 12px rgba(0,0,0,0.8))"
                    />
                    <!-- Tooltip Arrow -->
                    <polygon
                      points="0,-6 -6,-12 6,-12"
                      fill="#0B0E17"
                      stroke="#00D1B2"
                      stroke-width="1"
                    />
                    <!-- Tooltip City Text -->
                    <text
                      x="0"
                      y="-26"
                      text-anchor="middle"
                      fill="#FFFFFF"
                      font-size="10"
                      font-weight="bold"
                      font-family="sans-serif"
                    >
                      {city.name}
                    </text>
                    <!-- Tooltip Subtext -->
                    <text
                      x="0"
                      y="-13"
                      text-anchor="middle"
                      fill="#00D1B2"
                      font-size="8.5"
                      font-weight="600"
                      font-family="sans-serif"
                    >
                      {city.projects}+ Klien Aktif
                    </text>
                  </g>
                {/if}
              </g>
            {/each}
          </svg>

          <!-- Map Legend (Bottom Left) -->
          <div class="absolute bottom-2 sm:bottom-3 left-3 sm:left-4 flex items-center gap-3 sm:gap-4 bg-[#0A0C16]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] sm:text-xs">
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#00D1B2] animate-pulse"></span>
              <span class="text-gray-300">Pusat Klien</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-slate-400"></span>
              <span class="text-gray-400">Wilayah Aktif</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Numbers & Scrollable City Badges -->
      <div class="lg:col-span-4 flex flex-col justify-between h-full pt-2 lg:pt-6">
        
        <!-- Top Stats Counters -->
        <div class="grid grid-cols-2 gap-6 mb-8 text-center lg:text-left">
          <!-- Stat 1: Cities & Regencies -->
          <div>
            <div class="text-4xl sm:text-5xl font-black text-[#00D1B2] tracking-tight drop-shadow-[0_0_8px_rgba(0,209,178,0.25)]">
              {citiesCount}+
            </div>
            <div class="text-xs sm:text-sm text-gray-200 font-bold uppercase tracking-wider mt-1">
              Kota &amp; Kabupaten
            </div>
            <div class="text-[11px] text-gray-400">
              Dari Sabang sampai Merauke
            </div>
          </div>

          <!-- Stat 2: Provinces Reached -->
          <div>
            <div class="text-4xl sm:text-5xl font-black text-[#00D1B2] tracking-tight drop-shadow-[0_0_8px_rgba(0,209,178,0.25)]">
              {provincesCount}
            </div>
            <div class="text-xs sm:text-sm text-gray-200 font-bold uppercase tracking-wider mt-1">
              Provinsi Terjangkau
            </div>
            <div class="text-[11px] text-gray-400">
              Di seluruh kepulauan Indonesia
            </div>
          </div>
        </div>

        <!-- Interactive Scrollable City Pills Container -->
        <div class="relative bg-white/3 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col shadow-inner backdrop-blur-xs">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
              <MapPin size={13} class="text-[#00D1B2]" />
              Daftar Wilayah Klien
            </span>
            <span class="text-[11px] text-gray-400">
              Hover untuk lihat peta
            </span>
          </div>

          <!-- Scrollable Pills Area with Custom Scrollbar -->
          <div class="city-scroll-container max-h-68 sm:max-h-72 overflow-y-auto pr-2 flex flex-wrap gap-2 content-start">
            {#each clientCities as city}
              <button
                type="button"
                onmouseenter={() => activeCityId = city.id}
                onmouseleave={() => activeCityId = null}
                class="px-3 py-1.5 rounded-xl text-xs sm:text-xs font-semibold transition-all duration-200 cursor-pointer border
                {activeCityId === city.id
                  ? 'bg-[#00D1B2]/20 text-[#00D1B2] border-[#00D1B2] shadow-[0_0_10px_rgba(0,209,178,0.3)] scale-105'
                  : 'bg-[#181C2C]/90 text-gray-300 border-white/5 hover:border-white/20 hover:text-white hover:bg-[#202538]'}"
              >
                {city.name}
              </button>
            {/each}
          </div>
        </div>

      </div>

    </div>

  </div>
</section>

<style>
  /* Custom Slim Scrollbar for City Pills */
  .city-scroll-container::-webkit-scrollbar {
    width: 5px;
  }
  .city-scroll-container::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.03);
    border-radius: 4px;
  }
  .city-scroll-container::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
  .city-scroll-container::-webkit-scrollbar-thumb:hover {
    background: #00D1B2;
  }
</style>
