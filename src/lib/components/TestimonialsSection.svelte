<script lang="ts">
  import emblaCarouselSvelte from 'embla-carousel-svelte';
  import Autoplay from 'embla-carousel-autoplay';
  import { Quote, UserCircle } from '@lucide/svelte';

  const testimonials = [
    {
      name: "Galih",
      company: "Pengusaha",
      quote: "Pengerjaannya cepat, sesuai brief, desainnya modern, mewah dan sesuai dengan bisnis dan target marketnya. InsyaAllah langganan.",
    },
    {
      name: "Setiawan",
      company: "UMKM",
      quote: "Terimakasih Jago Compro. Kualitas dan pelayanan anda sangat baik. Recommended.",
    },
    {
      name: "Resti",
      company: "Startup",
      quote: "Terima kasih banyak atas bantuannya, semoga compro ini bisa bantu usaha saya sebagai jembatan informasi kepada calon konsumen kami.",
    },
    {
      name: "Kiki",
      company: "Online Shop",
      quote: "Sukses selalu juga buat Jago Compro. Terima kasih atas doanya.",
    },
    {
      name: "Afdal",
      company: "Kontraktor",
      quote: "Semoga pelanggannya makin banyak & berkah. Terima kasih banyak, Pak.",
    },
    {
      name: "Fikri",
      company: "Retail",
      quote: "Makin sukses n jaya juga ya. Terimakasih Jago Compro.",
    },
    {
      name: "Ilham",
      company: "Servis",
      quote: "Mantap, lain waktu saya bisa order lagi. Terima kasih.",
    },
    {
      name: "Karen",
      company: "Konsultan",
      quote: "Moga semua lancar ya pak, terima kasih.",
    },
    {
      name: "Siti",
      company: "Catering",
      quote: "Desainnya sangat membantu meningkatkan citra bisnis saya di mata pelanggan.",
    },
    {
      name: "Ahmad",
      company: "Event Organizer",
      quote: "Layanan yang responsif dan hasil yang memuaskan. Akan kembali lagi untuk proyek selanjutnya.",
    },
  ];

  let emblaOptions = { loop: true };
  let emblaPlugins = [Autoplay({ delay: 3000, stopOnInteraction: false })];
</script>

<section id="testimonials" class="py-20 bg-[#0f172a]/80">
  <div class="container mx-auto px-6">
    <h2 class="text-4xl font-bold text-center mb-12 text-white">
      Apa Kata <span class="text-emerald-400">Klien Kami?</span>
    </h2>

    <div class="relative max-w-7xl mx-auto">
      <div
        class="overflow-hidden cursor-grab active:cursor-grabbing"
        use:emblaCarouselSvelte={{ options: emblaOptions, plugins: emblaPlugins }}
      >
        <div class="flex -ml-4">
          {#each testimonials as testimonial}
            <div class="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 pl-4">
              <div class="h-full p-6 bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-xl flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
                <div class="relative text-white p-2">
                  <Quote size={48} class="absolute -top-2 -left-2 text-emerald-500/10 -z-0" />
                  <p class="text-slate-200 italic relative z-10 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
                <div class="border-t border-slate-700/50 pt-4 mt-6 flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 flex-shrink-0">
                    <UserCircle size={32} />
                  </div>
                  <div>
                    <h4 class="font-bold text-white text-base">{testimonial.name}</h4>
                    <p class="text-sm text-emerald-400 font-medium">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
