<script setup lang="ts">
import { defaultPageTransition } from '~/transitions/default-page-transition'
import {
    isArchiveDocument,
    isHomeDocument,
    isProjectDocument,
    isProjectListingDocument,
} from '~/utils/prismic/document-type'
import { components } from '~/slices'

definePageMeta({
    pageTransition: defaultPageTransition,
})

const { webResponse, itemData, title, error } = await useFetchPage()

if (error) {
    showError(error)
}

usePage({ title, webResponse })

// Page type
const isHome = isHomeDocument(webResponse?.type) || webResponse?.url === '/'
const isArchive = isArchiveDocument(webResponse?.type)
const isProject = isProjectDocument(webResponse?.type)
const isProjectListing = isProjectListingDocument(webResponse?.type)

const pageComponentName = isHome
    ? 'VHomePage'
    : isProjectListing
    ? 'VProjectListingPage'
    : isArchive
    ? 'VArchivesPage'
    : isProject
    ? 'VProjectPage'
    : 'VDefaultPage'

const pageComponent = defineAsyncComponent(() => import(`~/components/organisms/${pageComponentName}.vue`))
</script>

<template>
    <div v-if="webResponse" :class="$style.root">
        <component :is="pageComponent" v-if="pageComponent" :web-response="webResponse" />
        <SliceZone v-if="itemData?.slices" wrapper="main" :slices="itemData.slices" :components="components" />
    </div>
</template>

<style lang="scss" module>
.root {
    position: relative;
    overflow: auto;
    min-height: var(--min-page-content-height);
}
</style>
