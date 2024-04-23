<script lang="ts" setup>
import LogoMain from '~/assets/images/logo.svg?component'

const { siteName, homeBasePath } = useCommonContent()
const playAnimation = ref(false)

const { isLoading } = useLoadingIndicator()
</script>

<template>
  <div :class="$style.root">
    <NuxtLink
      :to="homeBasePath"
      :class="$style.home"
      @mouseenter="playAnimation = true"
      @mouseleave="playAnimation = false"
    >
      <VSpinner v-if="isLoading" :class="$style.spinner" />
      <LogoMain v-else viewBox="0 0 86 80" :class="$style.logo" />
      <VSplitWord :class="$style['logo-text']" :content="siteName" :play-animation="playAnimation" />
    </NuxtLink>
    <VTopBarNav :class="$style.nav" />
    <VLocaleSelect />
  </div>
</template>

<style lang="scss" module>
.root {
  position: sticky;
  z-index: 101;
  top: 0;
  display: flex;
  height: var(--v-top-bar-height);
  align-items: center;
  color: color(white);
  mix-blend-mode: difference;
  padding-inline: var(--page-gutter);
}

.spinner {
  width: rem(28);
}

.home {
  position: relative;
  display: flex;
  align-items: center;
  gap: rem(12);
}

.logo {
  width: rem(32);
  height: auto;
}

.logo-text {
  position: absolute;
  left: rem(48);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;

  @media (hover: hover) {
    .home:hover & {
      opacity: 1;
    }
  }
}

.nav {
  margin-right: rem(20);
  margin-left: auto;
}
</style>
