<script lang="ts" setup>
import { defaultPageTransition } from '~/transitions/default-page-transition'
import { components } from '~/slices'
import { isExistingDocumentType } from '~/utils/prismic/document-type'
import { useRoutePathToPrismicDocument } from '~/composables/use-route-path-to-prismic-document'

definePageMeta({
  pageTransition: defaultPageTransition,
})

const prismicDocumentType = useRoutePathToPrismicDocument()
const { prismicDocumentData, pageData, alternateLinks, error } = await useFetchPage(prismicDocumentType)

if (!isExistingDocumentType(prismicDocumentType)) {
  showError({ status: 404, message: "Le type de document prismic n'existe pas" })
} else if (error) {
  console.log('fetch error', error)
  showError(error)
}

const pageTitle = computed(() => `${pageData?.meta_title || pageData?.title} | Hugo Tomasi`)

usePage({
  webResponse: prismicDocumentData,
  alternateLinks,
  title: pageTitle.value,
})
</script>

<template>
  <div :class="$style.root" class="grid">
    <VPageFactory :type="prismicDocumentType" :document="prismicDocumentData" />
    <LazySliceZone
      v-if="pageData?.slices?.length"
      :slices="pageData.slices"
      wrapper="main"
      :components="components"
      :class="$style.slices"
    />
  </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
}

.slices {
  position: relative;
  grid-column: 1 / -1;

  @include media('>=md') {
    @include line(right);

    grid-column: 1 / -4;
    width: calc(100% + var(--gutter));
  }
}
</style>
