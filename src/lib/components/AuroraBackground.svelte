<script lang="ts">
  interface Props {
    variant?: 'default' | 'left' | 'right' | 'center' | 'diagonal' | 'full';
    intensity?: 'subtle' | 'normal' | 'vibrant';
  }

  let {
    variant = 'default',
    intensity = 'normal'
  }: Props = $props();

  // Opacity multiplier based on intensity
  const meshOpacity = $derived(intensity === 'vibrant' ? 'opacity-65' : (intensity === 'subtle' ? 'opacity-35' : 'opacity-50'));
</script>

<div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
  <!-- Micro-Grain Noise Texture Overlay -->
  <svg class="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none z-20 mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
    <filter id="aurora-grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#aurora-grain)" />
  </svg>

  <!-- Micro-dot Shimmer Matrix Grid -->
  <div class="absolute inset-0 bg-[radial-gradient(#00D1B2_1px,transparent_1px)] bg-size-[28px_28px] opacity-[0.025] pointer-events-none z-10"></div>

  <!-- Animated Fluid Mesh Foundation -->
  <div class="aurora-liquid-mesh absolute inset-[-20%] {meshOpacity}"></div>

  <!-- Multi-Orb Aurora Dynamic Lights based on Variant -->
  {#if variant === 'default' || variant === 'full'}
    <!-- Dual Orb Flow -->
    <div class="aurora-liquid-wave liquid-wave-1 -top-16 -left-16 w-137.5 h-137.5 bg-linear-to-tr from-[#00D1B2]/35 via-[#10B981]/40 to-teal-400/25"></div>
    <div class="aurora-liquid-wave liquid-wave-2 -bottom-16 -right-16 w-125 h-112.5 bg-linear-to-bl from-[#059669]/30 via-[#00F5D4]/30 to-emerald-500/20"></div>
    <div class="aurora-liquid-wave liquid-wave-3 top-1/3 right-1/4 w-112.5 h-100 bg-linear-to-tr from-[#00F5D4]/25 via-[#00D1B2]/30 to-emerald-600/20"></div>
  {:else if variant === 'left'}
    <!-- Left Anchored Fluid Aurora Ribbon -->
    <div class="aurora-liquid-wave liquid-wave-1 -top-20 -left-20 w-150 h-125 bg-linear-to-br from-[#00D1B2]/40 via-[#10B981]/45 to-teal-500/25"></div>
    <div class="aurora-liquid-wave liquid-wave-2 top-1/3 -left-12 w-120 h-112.5 bg-linear-to-tr from-[#047857]/30 via-[#00F5D4]/30 to-emerald-600/20"></div>
    <div class="aurora-liquid-wave liquid-wave-3 bottom-0 left-1/4 w-112.5 h-100 bg-linear-to-tr from-[#059669]/25 via-[#00D1B2]/25 to-teal-400/15"></div>
  {:else if variant === 'right'}
    <!-- Right Anchored Fluid Aurora Ribbon -->
    <div class="aurora-liquid-wave liquid-wave-2 -top-20 -right-20 w-150 h-137.5 bg-linear-to-bl from-[#00D1B2]/40 via-[#10B981]/45 to-emerald-600/25"></div>
    <div class="aurora-liquid-wave liquid-wave-1 top-1/3 -right-12 w-145 h-125 bg-linear-to-tr from-[#059669]/30 via-[#00F5D4]/30 to-teal-500/20"></div>
    <div class="aurora-liquid-wave liquid-wave-3 bottom-0 right-1/4 w-112.5 h-100 bg-linear-to-r from-[#00F5D4]/25 via-[#00D1B2]/25 to-emerald-500/15"></div>
  {:else if variant === 'center'}
    <!-- Central Symmetrical Aurora Expansion -->
    <div class="aurora-liquid-wave liquid-wave-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-125 bg-linear-to-tr from-[#00D1B2]/35 via-[#10B981]/40 to-teal-300/25"></div>
    <div class="aurora-liquid-wave liquid-wave-2 -top-16 left-1/3 w-162.5 h-137.5 bg-linear-to-bl from-[#059669]/30 via-[#00F5D4]/30 to-emerald-500/20"></div>
    <div class="aurora-liquid-wave liquid-wave-3 -bottom-16 right-1/3 w-112.5 h-100 bg-linear-to-r from-[#00D1B2]/25 via-[#047857]/25 to-teal-400/15"></div>
  {:else if variant === 'diagonal'}
    <!-- Dual Diagonal Aurora Waves -->
    <div class="aurora-liquid-wave liquid-wave-1 -top-24 -right-24 w-137.5 h-125 bg-linear-to-tr from-[#00D1B2]/40 via-[#10B981]/45 to-emerald-600/30"></div>
    <div class="aurora-liquid-wave liquid-wave-3 -bottom-24 -left-24 w-150 h-125 bg-linear-to-bl from-[#047857]/35 via-[#00F5D4]/35 to-teal-500/25"></div>
    <div class="aurora-liquid-wave liquid-wave-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-105 h-100 bg-linear-to-r from-[#00D1B2]/25 via-[#10B981]/25 to-teal-400/15"></div>
  {/if}

  <!-- Top and Bottom Vignette for seamless transitions -->
  <div class="absolute inset-0 bg-linear-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A] opacity-60"></div>
</div>
