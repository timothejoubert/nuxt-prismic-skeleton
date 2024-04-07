<script setup lang="ts">
import { VueMarqueeSlider } from 'vue3-marquee-slider'
import '@/node_modules/vue3-marquee-slider/dist/style.css'

// const vueMarqueeSliderProps = VueMarqueeSlider().props

defineProps({
  space: Number,
  speed: Number,
  reverse: Boolean,
})
const id = useId()
</script>

<template>
  <VueMarqueeSlider :id="id" :space="18" :speed="40000" :reverse="reverse">
    <slot />
  </VueMarqueeSlider>
</template>
