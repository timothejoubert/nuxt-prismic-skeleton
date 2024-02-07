<script lang="ts" setup></script>

<template>
  <div :class="$style.root">
    <div>Topbar</div>
    <slot />
    <div>Footer</div>
  </div>
</template>

<style lang="scss" module>
.root {
}
</style>
