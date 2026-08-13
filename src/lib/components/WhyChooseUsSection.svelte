<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';

  let isVisible = $state(false);
  let sectionEl: HTMLElement | null = $state(null);
  
  let card1El: HTMLImageElement | null = $state(null);
  let card2El: HTMLImageElement | null = $state(null);
  let card3El: HTMLImageElement | null = $state(null);

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible = true;
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

  function handleMouseMove(e: MouseEvent, cardEl: HTMLImageElement | null) {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Hitung sudut rotasi 3D berdasarkan ukuran gambar
    const angleX = (yc - y) / (yc / 10);
    const angleY = (x - xc) / (xc / 10);
    
    // Animasikan gambar
    cardEl.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.04, 1.04, 1.04)`;
    
    // Terapkan bayangan dinamis langsung ke gambar dengan tambahan ambient glow tipis dan efek pencahayaan (brightness)
    cardEl.style.filter = `drop-shadow(${-angleY * 1.2}px ${angleX * 1.2}px 20px rgba(0, 209, 178, 0.3)) drop-shadow(0 0 30px rgba(0, 209, 178, 0.2)) drop-shadow(0 15px 30px rgba(0, 0, 0, 0.5)) brightness(1.05)`;
  }
  
  function handleMouseLeave(cardEl: HTMLImageElement | null) {
    if (!cardEl) return;
    // Kembalikan gambar ke posisi semula
    cardEl.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    cardEl.style.filter = `drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))`;
  }
</script>

<section 
  id="why-choose-us" 
  bind:this={sectionEl}
  class="py-20 bg-[#0A0A0A] relative overflow-hidden"
>
  <!-- Decorative background glow -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-[#00D1B2]/5 rounded-full blur-[130px] pointer-events-none z-0"></div>

  <div class="container mx-auto px-6 lg:px-16 relative z-10">
    <!-- Header -->
    <div 
      class="text-center mb-16 transition-all duration-1000 ease-out transform
      {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}"
    >
      <h2 class="text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
        Mengapa <span class="text-[#00D1B2]">Memilih Kami?</span>
      </h2>
      <p class="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        Solusi terpercaya untuk mengurus legalitas, membangun identitas visual, hingga merilis platform digital bisnis Anda secara profesional.
      </p>
    </div>

    <!-- Images Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Image 1 Container -->
      <div 
        class="relative transform transition-all duration-1000 ease-out flex items-center justify-center
        {isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}"
        style="transition-delay: 100ms;"
      >
        <img
          bind:this={card1El}
          onmousemove={(e) => handleMouseMove(e, card1El)}
          onmouseleave={() => handleMouseLeave(card1El)}
          src="{base}/why-choose-us/group-1.webp"
          alt="Keunggulan Jago Compro - 1"
          loading="lazy"
          class="w-full h-auto object-contain cursor-pointer transition-all duration-300 ease-out"
          style="filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));"
        />
      </div>

      <!-- Image 2 Container -->
      <div 
        class="relative transform transition-all duration-1000 ease-out flex items-center justify-center
        {isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}"
        style="transition-delay: 250ms;"
      >
        <img
          bind:this={card2El}
          onmousemove={(e) => handleMouseMove(e, card2El)}
          onmouseleave={() => handleMouseLeave(card2El)}
          src="{base}/why-choose-us/group-1-1.webp"
          alt="Keunggulan Jago Compro - 2"
          loading="lazy"
          class="w-full h-auto object-contain cursor-pointer transition-all duration-300 ease-out"
          style="filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));"
        />
      </div>

      <!-- Image 3 Container -->
      <div 
        class="relative transform transition-all duration-1000 ease-out flex items-center justify-center
        {isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}"
        style="transition-delay: 400ms;"
      >
        <img
          bind:this={card3El}
          onmousemove={(e) => handleMouseMove(e, card3El)}
          onmouseleave={() => handleMouseLeave(card3El)}
          src="{base}/why-choose-us/group-1-2.webp"
          alt="Keunggulan Jago Compro - 3"
          loading="lazy"
          class="w-full h-auto object-contain cursor-pointer transition-all duration-300 ease-out"
          style="filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));"
        />
      </div>
    </div>
  </div>
</section>
