<script setup lang="ts">
import type { ProjectPageDocument } from '~/prismicio-types'
import { defaultPageTransition } from '~/transitions/default-page-transition'
import { DocumentType } from '~/constants/document-type'

definePageMeta({
  pageTransition: defaultPageTransition,
  name: DocumentType.PROJECT,
  alias: ['/en-gb/projets/:uid'],
})

const { webResponse, pageData, alternateLinks, error } = await useFetchPage<ProjectPageDocument>(DocumentType.PROJECT)

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
    <h1>Page projet</h1>
    <pre v-if="pageData">{{ pageData }}</pre>
  </div>
</template>

<style lang="scss" module>
.root {
}
</style>
