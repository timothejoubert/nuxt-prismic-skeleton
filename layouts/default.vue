<script lang="ts" setup>
const { isSplashScreenRunning } = useSplashScreen({ onLeave: () => scrollTo(0, 0) })
</script>

<template>
  <div :class="[$style.root, isSplashScreenRunning && $style['root--loading']]">
    <Transition :name="$style['screen-transition']">
      <VSplashScreen v-if="isSplashScreenRunning" />
    </Transition>
    <VTopBar />
    <slot />
    <VFooter />
  </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
  background-color: #fff;

  &--loading {
    cursor: wait;
    max-height: 100svh;
    overflow: hidden;
  }
}

.screen-transition:global(#{'-enter-active'}),
.screen-transition:global(#{'-leave-active'}) {
  transition: opacity;
  transition-duration: 1s;
  transition-delay: 0.5s;
  transition-timing-function: ease(out-quart);
}

.screen-transition:global(#{'-enter-from'}),
.screen-transition:global(#{'-leave-to'}) {
  opacity: 0;
}
</style>
