<script lang="ts">
  import { onMount } from 'svelte';
  import { base } from '$app/paths';

  let isVisible = $state(false);
  let sectionEl: HTMLElement | null = $state(null);

  // Pisahkan Hafid (sebelah kiri) dan anggota tim lainnya (sebelah kanan)
  const rawOtherTeam = [
    { name: "fadli", img: "/team/fadli.webp" },
    { name: "ahmad", img: "/team/ahmad.webp" },
    { name: "arief", img: "/team/arief.webp" },
    { name: "apip", img: "/team/apip.webp" },
    { name: "dira", img: "/team/dira.webp" },
    { name: "rizky", img: "/team/rizky.webp" }
  ];

  const otherTeam = rawOtherTeam.map(member => ({ ...member, img: `${base}${member.img}` }));

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
  id="team" 
  bind:this={sectionEl}
  class="py-20 bg-[#0A0A0A] relative overflow-hidden"
>
  <!-- Decorative background glow -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D1B2]/5 rounded-full blur-[130px] pointer-events-none z-0"></div>

  <div class="container mx-auto px-6 lg:px-16 relative z-10">
    <!-- Header -->
    <div 
      class="text-center mb-20 transition-all duration-1000 ease-out transform
      {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}"
    >
      <h2 class="text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
        Tim <span class="text-[#00D1B2]">Jago COMPRO</span>
      </h2>
      <p class="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        Di balik setiap compro yang mewah, legalitas yang sah, dan website yang cepat, ada tim profesional yang siap membantu kesuksesan bisnis Anda.
      </p>
    </div>

    <!-- Asymmetrical Layout: Hafid on the left, others on the right -->
    <div class="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-center">
      <!-- Left Column: Featured Member (Hafid) - Lebih Besar -->
      <div 
        class="w-full lg:w-[35%] flex flex-col justify-center items-center transform transition-all duration-1000 ease-out
        {isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}"
        style="transition-delay: 100ms;"
      >
        <img
          src="{base}/team/hafid.webp"
          alt="Featured Tim - Hafid"
          loading="lazy"
          class="team-img w-full max-w-[340px] lg:max-w-none h-auto object-contain cursor-pointer rounded-2xl"
        />
      </div>

      <!-- Right Column: Grid 6 Anggota Tim Lainnya -->
      <div class="w-full lg:w-[65%] flex flex-col justify-center">
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {#each otherTeam as member, index}
            <div 
              class="relative flex items-center justify-center transform transition-all duration-1000 ease-out
              {isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-95'}"
              style="transition-delay: {(index + 2) * 100}ms;"
            >
              <img
                src={member.img}
                alt={`Tim - ${member.name}`}
                loading="lazy"
                class="team-img w-full h-auto object-contain cursor-pointer rounded-2xl"
              />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .team-img {
    transition: all 400ms cubic-bezier(0.16, 1, 0.3, 1);
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.35));
  }

  .team-img:hover {
    transform: scale(1.04) translateY(-6px);
    filter: drop-shadow(0 0 25px rgba(0, 209, 178, 0.25)) drop-shadow(0 15px 30px rgba(0, 0, 0, 0.5));
  }
</style>
