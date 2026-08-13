<script lang="ts">
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { Plus, Minus, Search, HelpCircle } from '@lucide/svelte';

  let isVisible = $state(false);
  let sectionEl: HTMLElement | null = $state(null);

  type FaqCategory = 'Semua' | 'Company Profile' | 'Logo' | 'Website' | 'Legalitas' | 'Pembayaran & Finalisasi';

  const categories: FaqCategory[] = [
    'Semua',
    'Company Profile',
    'Logo',
    'Website',
    'Legalitas',
    'Pembayaran & Finalisasi'
  ];

  let selectedCategory = $state<FaqCategory>('Semua');
  let searchQuery = $state('');

  const faqs = [
    // COMPANY PROFILE
    {
      category: 'Company Profile' as FaqCategory,
      q: "Data apa saja yang perlu disiapkan untuk pembuatan Company Profile?",
      a: "Kami membutuhkan data dasar perusahaan seperti nama perusahaan, profil/sejarah, visi & misi, produk/jasa, alamat & kontak, foto, logo, legalitas (opsional), serta warna yang diinginkan untuk Company Profile."
    },
    {
      category: 'Company Profile' as FaqCategory,
      q: "Kalau belum punya narasi atau bingung dengan kontennya, apakah bisa dibantu?",
      a: "Bisa. Pengembangan narasi dan konten kami bantu secara gratis. Anda cukup memberikan informasi dasar mengenai perusahaan, kemudian kami bantu mengembangkannya menjadi materi yang lebih profesional."
    },
    {
      category: 'Company Profile' as FaqCategory,
      q: "Kalau tidak punya foto perusahaan, apakah tetap bisa membuat Company Profile?",
      a: "Bisa. Kami dapat membantu memberikan arahan dan menyiapkan kebutuhan visual yang sesuai dengan konten Company Profile secara gratis."
    },
    {
      category: 'Company Profile' as FaqCategory,
      q: "Berapa lama proses pengerjaan Company Profile?",
      a: "Pengerjaan reguler sekitar 3–4 hari kerja, tergantung paket dan kelengkapan data. Tersedia juga layanan Express 1 hari dengan biaya tambahan."
    },
    {
      category: 'Company Profile' as FaqCategory,
      q: "Kapan waktu pengerjaan mulai dihitung?",
      a: "Waktu pengerjaan mulai dihitung setelah data yang dibutuhkan lengkap dan DP 50% diterima. Apabila terdapat keterlambatan pengiriman data atau feedback, timeline pengerjaan dapat menyesuaikan."
    },
    {
      category: 'Company Profile' as FaqCategory,
      q: "Apakah bisa melakukan revisi?",
      a: "Bisa. Revisi minor bebas, seperti mengganti teks, warna, foto, atau mengubah posisi elemen maupun halaman. Untuk perubahan style atau konsep desain secara keseluruhan, tersedia 1x revisi mayor."
    },
    {
      category: 'Company Profile' as FaqCategory,
      q: "Bagaimana jika ingin mengganti seluruh konsep setelah desain selesai?",
      a: "Perubahan style atau konsep secara keseluruhan termasuk revisi mayor. Tersedia 1x revisi mayor. Permintaan tambahan di luar scope yang telah disepakati dapat disesuaikan kembali berdasarkan kebutuhan."
    },
    {
      category: 'Company Profile' as FaqCategory,
      q: "Apakah bisa menambah halaman Company Profile?",
      a: "Bisa. Kami menyediakan beberapa pilihan jumlah halaman, termasuk paket 4, 6, 8, 10 halaman dan Custom. Untuk penambahan halaman atau kebutuhan di luar paket, biaya akan disesuaikan dengan kebutuhan."
    },
    {
      category: 'Company Profile' as FaqCategory,
      q: "File apa saja yang didapat setelah Company Profile selesai?",
      a: "File final terdiri dari JPEG, PDF, dan file master Photoshop (PSD)."
    },
    {
      category: 'Company Profile' as FaqCategory,
      q: "Apakah Jago Compro menyediakan jasa cetak?",
      a: "Tidak. Kami khusus menyediakan jasa desain, bukan jasa percetakan. File final dapat digunakan untuk kebutuhan digital maupun dicetak melalui percetakan pilihan Anda."
    },

    // LOGO
    {
      category: 'Logo' as FaqCategory,
      q: "Apakah Jago Compro juga melayani pembuatan logo?",
      a: "Bisa. Kami menyediakan desain logo 2 opsi, lengkap dengan filosofi logo dan mockup preview. File logo juga diberikan dalam format HD dan file master."
    },
    {
      category: 'Logo' as FaqCategory,
      q: "Apakah logo bisa dibuat sekaligus dengan Company Profile?",
      a: "Bisa. Logo dapat dibuat terlebih dahulu atau dikerjakan bersamaan dengan Company Profile agar identitas visual perusahaan dapat diterapkan secara konsisten pada seluruh desain."
    },

    // WEBSITE
    {
      category: 'Website' as FaqCategory,
      q: "Apakah Jago Compro juga menyediakan jasa pembuatan website?",
      a: "Bisa. Kami menyediakan layanan Website / Landing Page dengan pilihan paket sesuai kebutuhan, mulai dari website 1 halaman hingga 2 halaman, dengan fitur dan fasilitas mengikuti paket yang dipilih."
    },
    {
      category: 'Website' as FaqCategory,
      q: "Apakah website sudah termasuk domain?",
      a: "Ya. Paket website yang tercantum di pricelist sudah mencakup domain .com. Detail fitur dan fasilitas mengikuti paket yang dipilih."
    },
    {
      category: 'Website' as FaqCategory,
      q: "Apakah website bisa direvisi atau ditambah fiturnya?",
      a: "Bisa, selama masih dalam ruang lingkup pekerjaan yang telah disepakati. Penambahan halaman, fitur, atau perubahan di luar scope awal dapat disesuaikan dengan biaya tambahan."
    },
    {
      category: 'Website' as FaqCategory,
      q: "Apakah setelah website selesai sudah termasuk maintenance?",
      a: "Pengerjaan website mengikuti scope dan fasilitas pada paket yang dipilih. Untuk maintenance, perubahan konten, penambahan fitur, atau pengembangan setelah proyek selesai, dapat dibicarakan sebagai kebutuhan tambahan."
    },

    // LEGALITAS
    {
      category: 'Legalitas' as FaqCategory,
      q: "Apakah Jago Compro melayani pembuatan legalitas perusahaan?",
      a: "Bisa. Kami menyediakan layanan pendirian legalitas untuk PT Perorangan, CV, PT, Yayasan Nonprofit, dan Yayasan Profit, dengan kebutuhan dokumen yang menyesuaikan jenis badan usaha."
    },
    {
      category: 'Legalitas' as FaqCategory,
      q: "Berapa lama proses pembuatan legalitas?",
      a: "Estimasi pengerjaan layanan legalitas adalah sekitar 7–14 hari kerja, tergantung jenis legalitas, kelengkapan data/dokumen, dan proses administrasi yang diperlukan."
    },
    {
      category: 'Legalitas' as FaqCategory,
      q: "Apakah bisa sekaligus mengurus legalitas, logo, Company Profile, dan website?",
      a: "Bisa. Kami menyediakan layanan All In One yang menggabungkan legalitas, website, logo, dan Company Profile dalam satu paket. Tersedia paket untuk CV maupun PT."
    },

    // PEMBAYARAN & FINALISASI
    {
      category: 'Pembayaran & Finalisasi' as FaqCategory,
      q: "Bagaimana alur pembayaran dan penyerahan file?",
      a: "Alur pengerjaan secara umum: Data & Brief → Invoice → DP 50% → Proses Pengerjaan → Review → Revisi & ACC → Pelunasan → Final File. Pengerjaan dimulai setelah DP 50% diterima. File final diserahkan setelah pekerjaan mendapatkan ACC dan pembayaran telah dilunasi. Catatan: Seluruh pengerjaan mengikuti scope, paket, dan layanan yang telah disepakati di awal. Kebutuhan tambahan di luar scope dapat dibicarakan dan disesuaikan sebelum pengerjaan dilakukan."
    }
  ];

  let filteredFaqs = $derived(
    faqs.filter((faq) => {
      const matchesCat = selectedCategory === 'Semua' || faq.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery = query === '' || 
        faq.q.toLowerCase().includes(query) || 
        faq.a.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query);
      return matchesCat && matchesQuery;
    })
  );

  let openIndex = $state<number | null>(null);

  function toggleFaq(index: number) {
    openIndex = openIndex === index ? null : index;
  }

  function selectCategory(cat: FaqCategory) {
    selectedCategory = cat;
    openIndex = null;
  }

  function getCategoryCount(cat: FaqCategory) {
    if (cat === 'Semua') return faqs.length;
    return faqs.filter(f => f.category === cat).length;
  }

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
  id="faq" 
  bind:this={sectionEl}
  class="py-20 bg-[#0A0A0A] relative overflow-hidden"
>
  <div class="container mx-auto px-6 lg:px-16 relative z-10">
    <!-- Header -->
    <div 
      class="text-center mb-12 transition-all duration-1000 ease-out transform
      {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}"
    >
      <div class="inline-flex items-center gap-2 bg-[#00D1B2]/10 border border-[#00D1B2]/30 px-4 py-1.5 rounded-full mb-4">
        <HelpCircle size={16} class="text-[#00D1B2]" />
        <span class="text-[#00D1B2] text-xs font-semibold tracking-wider uppercase">Pusat Informasi & Jawaban</span>
      </div>
      <h2 class="text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
        Pertanyaan <span class="text-[#00D1B2]">Sering Diajukan</span>
      </h2>
      <p class="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        Punya pertanyaan seputar layanan Company Profile, Logo, Website, Legalitas, atau Pembayaran? Temukan jawaban lengkapnya di bawah ini.
      </p>
    </div>

    <!-- Search & Filter Area -->
    <div 
      class="max-w-3xl mx-auto mb-10 transition-all duration-1000 ease-out transform
      {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}"
      style="transition-delay: 150ms;"
    >
      <!-- Search Input -->
      <div class="relative mb-6">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
          <Search size={20} />
        </div>
        <input 
          type="text"
          bind:value={searchQuery}
          placeholder="Cari pertanyaan... (contoh: revisi, domain, legalitas, pembayaran)"
          class="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00D1B2] focus:ring-1 focus:ring-[#00D1B2] transition-all text-sm sm:text-base"
        />
        {#if searchQuery}
          <button 
            type="button"
            onclick={() => searchQuery = ''}
            class="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-gray-400 hover:text-white"
          >
            Bersihkan
          </button>
        {/if}
      </div>

      <!-- Category Tabs -->
      <div class="flex flex-wrap justify-center gap-2">
        {#each categories as cat}
          <button
            type="button"
            onclick={() => selectCategory(cat)}
            class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 border
            {selectedCategory === cat 
              ? 'bg-[#00D1B2] text-[#0A0A0A] border-[#00D1B2] shadow-[0_0_15px_rgba(0,209,178,0.25)]' 
              : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30 hover:bg-white/10'}"
          >
            <span>{cat}</span>
            <span 
              class="text-[10px] px-1.5 py-0.5 rounded-full font-bold
              {selectedCategory === cat ? 'bg-black/20 text-[#0A0A0A]' : 'bg-white/10 text-gray-300'}"
            >
              {getCategoryCount(cat)}
            </span>
          </button>
        {/each}
      </div>
    </div>

    <!-- FAQ Accordion List -->
    <div class="max-w-3xl mx-auto flex flex-col gap-4 min-h-75">
      {#if filteredFaqs.length === 0}
        <div class="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
          <p class="text-gray-400 text-base mb-2">Tidak ada pertanyaan yang sesuai dengan kata kunci "{searchQuery}".</p>
          <button 
            type="button"
            onclick={() => { searchQuery = ''; selectedCategory = 'Semua'; }}
            class="text-[#00D1B2] text-sm underline font-semibold hover:text-white"
          >
            Tampilkan semua FAQ
          </button>
        </div>
      {:else}
        {#each filteredFaqs as faq, index}
          <div 
            class="border border-white/10 rounded-2xl bg-white/5 overflow-hidden transition-all duration-300 hover:border-white/20
            {openIndex === index ? 'border-[#00D1B2]/40 bg-white/8 shadow-[0_0_15px_rgba(0,209,178,0.05)]' : ''}"
          >
            <!-- Trigger Header -->
            <button
              type="button"
              onclick={() => toggleFaq(index)}
              class="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer focus:outline-none transition-colors duration-200"
            >
              <div class="pr-4">
                <span class="inline-block text-[11px] font-bold uppercase tracking-wider text-[#00D1B2] bg-[#00D1B2]/10 border border-[#00D1B2]/20 px-2.5 py-0.5 rounded-md mb-2">
                  {faq.category}
                </span>
                <h3 class="text-base sm:text-lg font-bold text-white transition-colors duration-200 leading-snug
                  {openIndex === index ? 'text-[#00D1B2]' : ''}"
                >
                  {faq.q}
                </h3>
              </div>
              <span class="text-white shrink-0 bg-white/10 p-2 rounded-full transition-all duration-300 ml-2
                {openIndex === index ? 'bg-[#00D1B2] text-[#0A0A0A] rotate-180' : ''}"
              >
                {#if openIndex === index}
                  <Minus size={18} />
                {:else}
                  <Plus size={18} />
                {/if}
              </span>
            </button>

            <!-- Content Panel -->
            {#if openIndex === index}
              <div 
                transition:slide={{ duration: 250 }}
                class="px-5 sm:px-6 pb-6 text-gray-300 text-sm sm:text-base leading-relaxed border-t border-white/5 pt-4"
              >
                {faq.a}
              </div>
            {/if}
          </div>
        {/each}
      {/if}
    </div>
  </div>

  <!-- Background Accent Blobs -->
  <div class="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
    <div class="absolute top-1/4 -left-20 w-96 h-96 bg-[#00D1B2]/10 rounded-full blur-[120px]"></div>
    <div class="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#00D1B2]/5 rounded-full blur-[120px]"></div>
  </div>
</section>
