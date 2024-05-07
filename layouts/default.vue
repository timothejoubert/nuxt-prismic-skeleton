<script lang="ts" setup>
const { isSplashScreenRunning } = useSplashScreen({ onLeave: () => scrollTo(0, 0) })
const { isOpen } = useMediaViewer()
</script>

<template>
  <div :class="[$style.root, isSplashScreenRunning && $style['root--loading']]">
    <ClientOnly>
      <Transition :name="$style['media-viewer-transition']">
        <LazyVMediaViewer v-if="isOpen" />
      </Transition>
    </ClientOnly>

    <Transition :name="$style['screen-transition']">
      <VSplashScreen v-if="isSplashScreenRunning" />
    </Transition>

    <VTopBar />
    <slot />
    <VFooter />
  </div>
</template>

<style lang="scss" module>
.media-viewer-transition {
  &:global(#{'-enter-active'}),
  &:global(#{'-leave-active'}) {
    transition-duration: 1.1s;
  }

  &:global(#{'-enter-active'})::after,
  &:global(#{'-leave-active'})::after {
    transition-duration: 0.6s;
    transition-property: opacity, scale;
    transition-timing-function: ease(out-quart);
  }

  &:global(#{'-enter-from'})::after,
  &:global(#{'-leave-to'})::after {
    opacity: 0;
    scale: 0.95;
  }

  &:global(#{'-enter-active'}) > *,
  &:global(#{'-leave-active'}) > * {
    transition:
      opacity 0.5s ease(out-quad) 0.15s,
      scale 0.5s ease(out-quad) 0.15s;
  }

  &:global(#{'-leave-active'}) > * {
    transition-delay: 0s;
  }

  &:global(#{'-enter-from'}) > *,
  &:global(#{'-leave-to'}) > * {
    opacity: 0;
    scale: 0.95;
  }
}

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
