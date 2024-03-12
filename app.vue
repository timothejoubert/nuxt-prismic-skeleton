<script lang="ts" setup>
const splashScreenState = useSplashScreenState()
</script>

<template>
  <div :class="$style.root">
    <ClientOnly>
      <VSplashScreen v-if="splashScreenState !== 'done'" />
    </ClientOnly>
    <VTopBar />
    <NuxtPage />
    <div>Footer</div>
  </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
}
</style>
