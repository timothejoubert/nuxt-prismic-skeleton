<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <div :class="$style.root">
    <VStoriesNav />
    <div :class="$style['page-wrapper']">
      <VStoriesTopBar />
      <NuxtPage />
    </div>
  </div>
</template>

<style module lang="scss">
.root {
  --v-stories-top-bar-height: 56px;

  display: flex;
}

.page-wrapper {
  flex-grow: 1;
}
</style>
