<script lang="ts" setup>
import { defaultPageTransition } from '~/transitions/default-page-transition'
import { mapRoutePathToPrismicDocument } from '~/utils/prismic/route-resolver'
import { components } from '~/slices'
import { DocumentType } from '~/constants/document-type'
import VAboutPage from '~/components/pages/VAboutPage/VAboutPage.vue'
import VHomePage from '~/components/pages/VHomePage/VHomePage.vue'
import VProjectListingPage from '~/components/pages/VProjectListingPage/VProjectListingPage.vue'
import VProjectPage from '~/components/pages/VProjectPage/VProjectPage.vue'
import VDefaultPage from '~/components/pages/VDefaultPage/VDefaultPage.vue'
import { isExistingDocumentType } from '~/utils/prismic/document-type'

definePageMeta({
  pageTransition: defaultPageTransition,
})

const route = useRoute()
const prismicDocumentType = mapRoutePathToPrismicDocument(route.path) || DocumentType.HOME
const { webResponse, pageData, alternateLinks, error } = await useFetchPage(prismicDocumentType)

if (!isExistingDocumentType(prismicDocumentType)) {
  showError({ status: 404, message: "Le type de document prismic n'existe pas" })
} else if (error) {
  console.log('fetch error', error)
  showError(error)
}

const pageTitle = computed(() => `${pageData?.meta_title || pageData?.title} | Hugo Tomasi`)

usePage({
  webResponse,
  alternateLinks,
  title: pageTitle.value,
})

const pageComponent = computed(() => {
  switch (prismicDocumentType) {
    case DocumentType.HOME:
      return VHomePage
    case DocumentType.ABOUT:
      return VAboutPage
    case DocumentType.PROJECT_LISTING:
      return VProjectListingPage
    case DocumentType.PROJECT:
      return VProjectPage
    case DocumentType.WEB_PAGE:
      return VDefaultPage
    default:
      showError({ status: 404, message: "La page que vous recherchez n'existe pas." })
      return VProjectPage
  }
})

console.log(webResponse)

const isProjectDocument = computed(() => prismicDocumentType === DocumentType.PROJECT)

const { data: projectList } = await usePrismicProjectDocuments()
const otherProject = computed(() => {
  return (
    projectList.value?.filter((p) => {
      return webResponse.id !== p.id
    }) || []
  )
})
</script>

<template>
  <div v-if="webResponse?.data" :class="$style.root">
    <component :is="pageComponent" :prismic-document="webResponse" />
    <LazySliceZone
      v-if="pageData?.slices"
      :slices="pageData.slices"
      wrapper="main"
      :components="components"
      :class="$style.slices"
    />
    <LazyVProjectsCarousel
      v-if="isProjectDocument && otherProject?.length"
      tag="section"
      :class="$style['other-projects']"
      :title="$t('project_page.see_more')"
      :projects="otherProject"
    />
  </div>
</template>

<style lang="scss" module>
.root {
}
.slices {
  // avoid collapsed margin
  padding-block: 1px;
}
</style>
