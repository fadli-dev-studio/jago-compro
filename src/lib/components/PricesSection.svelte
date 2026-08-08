<script lang="ts">
  import { BadgeCheck } from '@lucide/svelte';

  const packages = [
    { name: "On Point", imageSrc: "/prices/ON POINT.png" },
    { name: "Exclusive", imageSrc: "/prices/EXCLUSIVE.png" },
    { name: "Advance", imageSrc: "/prices/ADVANCE-2.png" },
    { name: "Expert", imageSrc: "/prices/EXPERT.png" },
    { name: "Ultimate", imageSrc: "/prices/ULTIMATE.png" },
    { name: "Custom", imageSrc: "/prices/CUSTOM.png" },
  ];
</script>

<section id="prices" class="py-20 bg-[#0f172a]">
  <div class="container mx-auto px-6">
    <h2 class="text-4xl font-bold text-center mb-4 text-white">
      Paket Harga <span class="text-emerald-400">Company Profile</span>
    </h2>
    <p class="text-center text-base mb-12 text-slate-300 max-w-2xl mx-auto">
      Kami menawarkan layanan paket pembuatan company profile untuk membantu usaha Anda terlihat
      profesional di mata klien dan partner bisnis Anda.
    </p>

    <!-- Grid Gambar Paket -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {#each packages as pkg}
        <div class="w-full flex justify-center cursor-pointer group">
          <div class="relative overflow-hidden rounded-2xl transition-transform duration-300 transform group-hover:scale-105">
            <img
              src={pkg.imageSrc}
              alt={`Paket ${pkg.name}`}
              width="400"
              height="600"
              class="w-full h-auto object-contain"
            />
          </div>
        </div>
      {/each}
    </div>

    <!-- Info Tambahan di Bawah -->
    <div class="flex flex-col md:flex-row justify-center items-center gap-6 mt-16 text-base text-cyan-200 text-center">
      <div class="flex items-center gap-2 bg-slate-800/60 px-4 py-2 rounded-full border border-slate-700">
        <BadgeCheck size={20} class="text-emerald-400 flex-shrink-0" />
        <span>Gratis Materi/Pengembangan Narasi</span>
      </div>
      <div class="flex items-center gap-2 bg-slate-800/60 px-4 py-2 rounded-full border border-slate-700">
        <BadgeCheck size={20} class="text-emerald-400 flex-shrink-0" />
        <span>Gratis Konsultasi</span>
      </div>
      <div class="flex items-center gap-2 bg-slate-800/60 px-4 py-2 rounded-full border border-slate-700">
        <BadgeCheck size={20} class="text-emerald-400 flex-shrink-0" />
        <span>Layanan Express 1 Hari <strong class="text-emerald-400 ml-1">(Extra 140K)</strong></span>
      </div>
    </div>
  </div>
</section>
