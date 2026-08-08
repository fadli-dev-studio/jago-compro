<script lang="ts">
  import { onMount } from 'svelte';

  let { onComplete = () => {} } = $props<{ onComplete?: () => void }>();

  let typewriterText = $state('');
  let isCursorHidden = $state(false);
  let isContentVisible = $state(false);
  let isScreenHidden = $state(false);
  let isDismissed = $state(false);

  const fullText = "One Stop Solution";
  const pauseAfterTyping = 300; // Fast pause after typing finishes

  onMount(() => {
    // Show content immediately
    isContentVisible = true;

    let charIndex = 0;

    function typeWriter() {
      if (charIndex < fullText.length) {
        typewriterText += fullText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 30); // Fast typing speed (30ms per char)
      } else {
        // Done typing
        setTimeout(() => {
          isCursorHidden = true;
          isScreenHidden = true;
          onComplete();
          setTimeout(() => {
            isDismissed = true;
          }, 400);
        }, pauseAfterTyping);
      }
    }

    setTimeout(typeWriter, 150); // Start typing almost instantly
  });
</script>

{#if !isDismissed}
  <div
    id="splash-screen"
    class="fixed inset-0 bg-[#0A0A0A]/90 backdrop-blur-xl z-[9999] flex flex-col justify-center items-center transition-all duration-400 ease-out {isScreenHidden ? 'opacity-0 pointer-events-none invisible' : 'opacity-100'}"
  >
    <div
      class="flex flex-col items-center justify-center transition-all duration-300 ease-out transform {isContentVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}"
    >
      <div class="flex items-center gap-2 mb-4">
        <span class="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#00D1B2]">Jago</span>
        <span class="text-4xl lg:text-5xl font-bold tracking-tight text-white">COMPRO</span>
      </div>
      <div class="flex items-center h-14 lg:h-20">
        <span class="text-3xl lg:text-5xl font-bold text-[#00D1B2] whitespace-nowrap tracking-tight">
          {typewriterText}
        </span>
        <span
          class="inline-block w-1 lg:w-1.5 h-10 lg:h-14 bg-[#00D1B2] ml-1 lg:ml-2 animate-[blink_0.8s_step-end_infinite] transition-opacity duration-200 {isCursorHidden ? 'opacity-0 animate-none' : 'opacity-100'}"
        ></span>
      </div>
    </div>
  </div>
{/if}
