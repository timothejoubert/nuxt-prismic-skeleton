<script lang="ts" setup>
import { InternalRouteName } from '~/constants/internal-route-name'
import type { HomeDocumentData } from '~/prismicio-types'
import VMedia from '~/composants/molecules/VMedia/VMedia.vue'

definePageMeta({
  name: InternalRouteName.HOME,
})

const { data: document } = usePrismicPage('home')
const documentData = computed(() => document?.value?.data as HomeDocumentData)

useWebPageSeoMeta({ webPage: documentData })
</script>

<template>
  <div>
    <h1>{{ documentData.title }}</h1>
    <h2>{{ documentData.subtitle }}</h2>
    <VMedia :media="documentData.media" background :video-props="{ background: true }" />
  </div>
</template>
