<script lang="ts" setup>
import type { HomePageDocument } from '~/prismicio-types'
import { defaultPageTransition } from '~/transitions/default-page-transition'

definePageMeta({
  pageTransition: defaultPageTransition,
})

const { webResponse, pageData, alternateLinks, error } = await useFetchPage<HomePageDocument>('home_page')

if (error) {
  showError(error)
}

usePage({
  webResponse: webResponse.value,
  alternateLinks: alternateLinks.value,
})
</script>

<template>
  <div v-if="pageData && !error">
    <h1>Web response page</h1>
    <pre>{{ pageData }}</pre>
    <h1>{{ pageData.title }}</h1>
    <h2>{{ pageData.subtitle }}</h2>
    <VMedia :media="pageData.media" background />
  </div>
</template>
