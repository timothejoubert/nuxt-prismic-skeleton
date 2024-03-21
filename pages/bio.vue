<script lang="ts" setup>
import { DocumentType } from '~/constants/document-type'
import { defaultPageTransition } from '~/transitions/default-page-transition'
import type { AboutPageDocument } from '~/prismicio-types'

definePageMeta({
  pageTransition: defaultPageTransition,
  name: DocumentType.ABOUT,
  alias: ['/en-gb/bio'],
})

const { webResponse, pageData, alternateLinks, error } = await useFetchPage<AboutPageDocument>('about_page')

if (error) {
  showError(error)
}

usePage({
  webResponse: webResponse.value,
  alternateLinks: alternateLinks.value,
  title: webResponse.value.data.meta_title || webResponse.value.data.title || webResponse.value.uid || '',
})
</script>

<template>
  <div :class="$style.root">
    <h1>page bio</h1>
    <div v-if="pageData">{{ pageData }}</div>
  </div>
</template>

<style lang="scss" module>
.root {
}
</style>
