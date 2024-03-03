<script setup lang="ts">
import type { ProjectPageDocument } from '~/prismicio-types'
import { defaultPageTransition } from '~/transitions/default-page-transition'

definePageMeta({
  pageTransition: defaultPageTransition,
})

const { webResponse, pageData, alternateLinks, error } = await useFetchPage<ProjectPageDocument>('project_page')

if (error) {
  showError(error)
}

usePage({
  webResponse: webResponse.value,
  alternateLinks: alternateLinks.value,
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
