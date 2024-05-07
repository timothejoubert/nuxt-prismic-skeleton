<script setup lang="ts">
const reference = {
  video_id: 'PriOYrrl_ec',
  provider_name: 'youtube',
}
</script>

<template>
  <NuxtStory :class="$style.root">
    <VVideoPlayer :reference="reference" fit="cover" background :class="$style.video" />
  </NuxtStory>
</template>

<style lang="scss" module>
.root {
  position: relative;
  width: 100%;
  height: 100%;
}

.video {
  position: absolute;
  inset: 0;
}
</style>
