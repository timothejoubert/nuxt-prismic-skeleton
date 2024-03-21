<script lang="ts" setup>
import { DocumentType } from '~/constants/document-type'
import { defaultPageTransition } from '~/transitions/default-page-transition'
import type { AboutPageDocument } from '~/prismicio-types'

definePageMeta({
  pageTransition: defaultPageTransition,
  name: DocumentType.ABOUT,
  alias: ['/info', '/a-propos', '/bio', '/en/bio'],
})

defineI18nRoute({
  paths: {
    fr: '/bio',
    en: '/about',
  },
})

// defineI18nRoute({
//   paths: {
//     fr: '/a-propos',
//     en: '/about',
//   },
// })

const { webResponse, pageData, alternateLinks, error } = await useFetchPage<AboutPageDocument>('about_page')

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
    <h1>page bio</h1>
    <div v-if="pageData">{{ pageData }}</div>
  </div>
</template>

<style lang="scss" module>
.root {
}
</style>
