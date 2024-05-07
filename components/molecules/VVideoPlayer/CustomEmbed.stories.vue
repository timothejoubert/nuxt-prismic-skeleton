<script setup lang="ts">
import type { CustomEmbedField } from '~/components/molecules/VVideoPlayer/VVideoPlayer.vue'

const youtube: CustomEmbedField = {
  video_id: 'PriOYrrl_ec',
  provider_name: 'youtube',
}

const vimeo: CustomEmbedField = {
  video_id: '379011318',
  provider_name: 'vimeo',
}
</script>

<template>
  <NuxtStory>
    <NuxtStoryVariant title="Youtube">
      <VVideoPlayer :reference="youtube" />
    </NuxtStoryVariant>
    <NuxtStoryVariant title="vimeo">
      <VVideoPlayer :reference="vimeo" />
    </NuxtStoryVariant>
  </NuxtStory>
</template>

<style lang="scss" module></style>
