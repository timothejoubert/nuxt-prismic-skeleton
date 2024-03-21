<script lang="ts" setup>
const splashScreenState = useSplashScreenState()

useHead({
  titleTemplate: (title) => `${title} | Portfolio`,
})
</script>

<template>
  <div :class="$style.root">
    <ClientOnly>
      <VSplashScreen v-if="splashScreenState !== 'done'" />
    </ClientOnly>
    <VTopBar />
    <slot />
    <VFooter />
  </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
  background-color: #fff;
}
</style>
