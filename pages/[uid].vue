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

if (error || !webResponse) {
  showError(error)
}

usePage({
  webResponse,
  alternateLinks,
  title: webResponse?.data.meta_title || webResponse?.data.title || webResponse?.uid || '',
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
