<script setup>

import { gsap } from 'gsap'
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLoading = ref(true)
const preloaderRef = ref(null)
const loaderRef = ref(null)
const textRef = ref(null)
const progressFillRef = ref(null)

onMounted(async () => {
  await nextTick()

  const tl = gsap.timeline({ defaults: { ease: "power2.out" } })

  // Initial states
  gsap.set([textRef.value, progressFillRef.value], { opacity: 0 })
  gsap.set(progressFillRef.value, { width: "0%" })

  // Animation
  tl.from(loaderRef.value, {
    scale: 0,
    rotation: -180,
    duration: 0.8,
    ease: "back.out(1.7)"
  })

  .to(textRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.6
  }, "-=0.3")

  // Fill progress bar slowly while loader spins
  .to(progressFillRef.value, {
    opacity: 1,
    width: "100%",
    duration: 2
  }, "-=0.4")

  // Fade out everything
  .to(preloaderRef.value, {
    opacity: 0,
    scale: 1.1,
    duration: 0.8,
    ease: "power2.inOut",
    delay: 0.3
  })

  .call(async () => {
    isLoading.value = false
    await router.isReady()
    router.replace('/auth/login')
  })
})
</script>

<template>
  <div>
    <Transition name="preloader">
      <div 
        v-if="isLoading"
        ref="preloaderRef"
        class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-900 to-gray-900"
      >
        <div class="flex flex-col items-center space-y-8">
          <div class="relative">
            <div ref="loaderRef" class="loader"></div>
            <div class="absolute inset-0 loader blur-sm opacity-50 scale-110"></div>
          </div>

          <div ref="textRef" class="text-center">
            <p class="text-green-300 text-lg font-semibold">Welcome to Three's Maria's</p>
          </div>

          <div class="w-64 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              ref="progressFillRef"
              class="h-full bg-gradient-to-r from-green-500 to-green-700"
            ></div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.loader {
  width: 60px;
  aspect-ratio: 1;
  display: grid;
  color: #16a34a; /* Tailwind green-600 */
  background: 
    conic-gradient(from 90deg at 3px 3px, #0000 90deg, currentColor 0)
    -3px -3px/calc(50% + 1.5px) calc(50% + 1.5px);
  animation: spin 1.5s linear infinite;
}

.loader::before,
.loader::after {
  content: "";
  grid-area: 1/1;
  background: repeating-conic-gradient(#0000 0 35deg, currentColor 0 90deg);
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 3px), #000 0);
  mask: radial-gradient(farthest-side, #0000 calc(100% - 3px), #000 0);
  border-radius: 50%;
}

.loader::after {
  margin: 20%;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

.preloader-enter-active,
.preloader-leave-active {
  transition: all 0.8s ease;
}

.preloader-enter-from,
.preloader-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
