<script lang="ts">
  import { Clock, PenTool, CalendarCheck } from '@lucide/svelte';

  const features = [
    {
      title: "Desain Cepat",
      description:
        "Tersedia layanan Express 1 hari jadi. Siap bantu kamu yang dikejar deadline, tanpa mengorbankan kualitas desain.",
      icon: Clock,
    },
    {
      title: "File Master",
      description:
        "Anda akan kami berikan file master editable untuk mempermudah dalam mencetak dan memperbaiki file.",
      icon: PenTool,
    },
    {
      title: "Tepat Waktu",
      description:
        "Kami berkomitmen menyelesaikan desain sesuai jadwal, jadi anda bisa tenang saat butuh company profile untuk keperluan penting.",
      icon: CalendarCheck,
    },
  ];
</script>

<section id="features" class="py-20 bg-[#0f172a]">
  <div class="container mx-auto px-6">
    <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
      Kenapa Pilih Kami ?
    </h2>

    <div class="grid md:grid-cols-3 justify-center gap-8 max-w-6xl mx-auto">
      {#each features as feature}
        {@const IconComponent = feature.icon}
        <div class="w-full max-w-[340px] min-h-[380px] mx-auto p-8 bg-slate-100 rounded-3xl flex flex-col items-center text-center justify-between shadow-xl hover:-translate-y-2 transition-transform duration-300">
          <div class="flex flex-col items-center gap-4 my-auto">
            <div class="p-4 bg-emerald-100 rounded-2xl text-emerald-600 mb-2">
              <IconComponent size={56} />
            </div>
            <h3 class="text-2xl text-slate-800 font-bold">{feature.title}</h3>
            <p class="text-slate-600 text-base leading-relaxed">{feature.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
