<script setup lang="ts"></script>

<template>
  <div :class="$style.root">
    <VStoriesNavToggle :class="$style.toggle" />
    <NuxtLink to="/" :class="$style.link">Website</NuxtLink>
  </div>
</template>

<style module lang="scss">
.root {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: var(--v-stories-top-bar-height, 56px);
  align-items: center;
  background-color: #f6f6f6ff;
}

.toggle {
  margin-left: 10px;
}

.link {
  padding-right: 20px;
  font-size: 12px;
}
</style>
