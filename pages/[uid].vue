<script lang="ts" setup>
import type { WebPageDocument } from '~/prismicio-types'
import { defaultPageTransition } from '~/transitions/default-page-transition'
import { DocumentType } from '~/constants/document-type'

definePageMeta({
  pageTransition: defaultPageTransition,
  name: DocumentType.WEB_PAGE,
  alias: ['/en-gb/:uid'],
})

const { webResponse, pageData, alternateLinks, error } = await useFetchPage<WebPageDocument>(DocumentType.WEB_PAGE)

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
  <div v-if="pageData && !error">
    <h1>Web response page</h1>
    <pre>{{ pageData }}</pre>
    <h1>{{ pageData.title }}</h1>
    <h2>{{ pageData.subtitle }}</h2>
    <VMedia :media="pageData.media" background />
  </div>
</template>
