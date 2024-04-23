<script lang="ts" setup>
import { mapRoutePathToDocument } from '~/utils/prismic/route-resolver'

const { isSplashScreenRunning } = useSplashScreen({ onLeave: () => scrollTo(0, 0) })

const currentPage = useCurrentPage()
useHead({
  titleTemplate: (title) => {
    return `${title || currentPage.value.title} | Hugo Tomasi`
  },
})

// TODO: fetch Prismic document type from routePath
// use wildCard for all pages
const home = mapRoutePathToDocument('/')
const homeEn = mapRoutePathToDocument('/en-gb')
const bio = mapRoutePathToDocument('/bio')
const bioEn = mapRoutePathToDocument('/en-gb/bio')

console.log('home type', home, homeEn)
console.log('bio type', bio, bioEn)
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
