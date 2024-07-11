<script lang="ts" setup></script>

<template>
  <div :class="$style.root">
<!--    <VTopBar />-->
    <VMainNav :class="$style.nav" />
    <NuxtPage />
    <VFooter />
  </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
}

.nav {
  width: calc(#{flex-grid-value(11, 14, '%', true)} + var(--gutter) * 2);
}
</style>
