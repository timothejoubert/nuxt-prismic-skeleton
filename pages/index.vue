<script lang="ts" setup>
import { InternalRouteName } from '~/constants/internal-route-name'
import type { HomeDocumentData } from '~/prismicio-types'
// import VMedia from '~/components/molecules/VMedia/VMedia.vue'

definePageMeta({
  name: InternalRouteName.HOME,
})

const { data: document } = await usePrismicPage('home')
const documentData = computed(() => document.value?.data as HomeDocumentData)

useWebPageSeoMeta({ webPage: documentData })

console.log(documentData.value)
</script>

<template>
  <div>
    <pre>
      {{ documentData }}
    </pre>
    <h1>{{ documentData.title }}</h1>
    <h2>{{ documentData.subtitle }}</h2>
    <VMedia :media="documentData.media" background />
  </div>
</template>
