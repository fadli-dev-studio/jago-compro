<script lang="ts">
  import CanvasBackground from '$lib/components/CanvasBackground.svelte';
  import HeroSection from '$lib/components/HeroSection.svelte';
  import ContinuousAuroraBackground from '$lib/components/ContinuousAuroraBackground.svelte';
  import WhyChooseUsSection from '$lib/components/WhyChooseUsSection.svelte';
  import ServicesSection from '$lib/components/ServicesSection.svelte';
  import AlurPengerjaanSection from '$lib/components/AlurPengerjaanSection.svelte';
  import ClientLogoSection from '$lib/components/ClientLogoSection.svelte';
  import ClientMapSection from '$lib/components/ClientMapSection.svelte';
  import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
  import TeamSection from '$lib/components/TeamSection.svelte';
  import PortfolioSection from '$lib/components/PortfolioSection.svelte';
  import FAQSection from '$lib/components/FAQSection.svelte';
</script>

<CanvasBackground />

<HeroSection />

<!-- Continuous Unified Emerald Aurora Canvas across all content sections -->
<div class="relative w-full overflow-hidden">
  <ContinuousAuroraBackground />
  
  <div class="relative z-10">
    <WhyChooseUsSection />
    <ServicesSection />
    <AlurPengerjaanSection />
    <ClientLogoSection />
    <ClientMapSection />
    <TestimonialsSection />
    <TeamSection />
    <PortfolioSection />
    <FAQSection />
  </div>
</div>
