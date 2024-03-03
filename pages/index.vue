<script lang="ts" setup>
import { InternalRouteName } from '~/constants/internal-route-name'
import type { HomeDocument } from '~/prismicio-types'
import { stringifyProps } from '~/utils/json'

definePageMeta({
  name: InternalRouteName.HOME,
})

const { webResponse, pageData, alternateLinks, error } = await useFetchPage<HomeDocument>('home')
if (error) showError(error)

usePage({
  webResponse: webResponse.value,
  alternateLinks: alternateLinks.value,
})

// const { data: document } = await usePrismicPage('home')
// const documentData = computed(() => document.value?.data as HomeDocumentData)

// useWebPageSeoMeta({ webPage: documentData })

const parsedData = computed(() => stringifyProps(pageData.value))
</script>

<template>
  <div v-if="pageData">
    <pre :class="$style.content">
      {{ parsedData }}
    </pre>
    <h1>{{ pageData.title }}</h1>
    <h2>{{ pageData.subtitle }}</h2>
    <VMedia :media="pageData.media" background />
  </div>
</template>

<style lang="scss" module="">
.content {
  white-space: pre-wrap;
}
</style>
