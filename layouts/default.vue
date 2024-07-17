<script lang="ts" setup></script>

<template>
    <div :class="$style.root">
        <VMainNav />
        <NuxtPage />
        <VFooter />
    </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
}
</style>
