<script lang="ts" setup>
import type { UseSeoMetaInput } from '@unhead/schema'
import { defaultPageTransition } from '~/transitions/default-page-transition'
import type { HomePageDocument } from '~/prismicio-types'
import { DocumentType } from '~/constants/document-type'

definePageMeta({
  pageTransition: defaultPageTransition,
  name: DocumentType.HOME,
  alias: ['/en-gb'],
})

const { webResponse, pageData, alternateLinks, error } = await useFetchPage<HomePageDocument>(DocumentType.HOME)

if (error) {
  showError(error)
}

usePage({
  webResponse: webResponse.value,
  alternateLinks: alternateLinks.value,
  title: webResponse.value.data.meta_title || webResponse.value.data.title || webResponse.value.uid || '',
})

const title = computed(() => pageData.value.meta_title || pageData.value.title)
const description = computed(() => pageData.value.meta_description)
const mainMedia = computed(() => pageData.value.meta_image || pageData.value.media)

const runtimeConfig = useRuntimeConfig()
const { $canonicalUrl } = useNuxtApp()

const metaServer: UseSeoMetaInput = {
  // socials
  ogSiteName: runtimeConfig.public.siteName,
  ogUrl: $canonicalUrl.value,
  ogTitle: title.value,
  twitterTitle: title.value,
  ogDescription: description.value,
  twitterDescription: description.value,
  // ogImage: getImageUrl(imagePath),
  twitterCard: 'summary',
}

const metaClient = {
  title: title.value,
  description: description.value,
  canonical: $canonicalUrl.value,
  robots: 'index, follow',
}

useSeoMeta(metaClient)
useServerSeoMeta(metaServer)
</script>

<template>
  <div :class="$style.root">
    <VHeaderHome :page-data="pageData" />
    <pre>{{ pageData }}</pre>
  </div>
</template>

<style lang="scss" module>
.root {
}
</style>
