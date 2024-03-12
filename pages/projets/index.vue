<script setup lang="ts">
import type { ProjectPageDocument } from '~/prismicio-types'
import { defaultPageTransition } from '~/transitions/default-page-transition'

definePageMeta({
  pageTransition: defaultPageTransition,
})

const { webResponse, pageData, alternateLinks, error } = await useFetchPage<ProjectPageDocument>('project_listing_page')

if (error) {
  showError(error)
}

usePage({
  webResponse: webResponse.value,
  alternateLinks: alternateLinks.value,
})

const prismic = usePrismic()
const listingResponse = await useAsyncData('project_listing', () => {
  return prismic.client.getAllByType('project_page')
})

const projects = computed(() => listingResponse.data.value)
</script>

<template>
  <div :class="$style.root">
    <h1>Page projet listing</h1>
    <pre v-if="pageData">{{ pageData }}</pre>
    <div v-if="projects?.length" :class="$style.list">
      <VProjectCard v-for="project in projects" :key="project.id" :class="$style.project" :project="project" />
    </div>
  </div>
</template>

<style lang="scss" module>
.root {
}
.list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.project {
  background-color: lightgrey;
}
</style>
