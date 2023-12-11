<script setup lang="ts">
import { defaultPageTransition } from '~/transitions/default-page-transition'
import {
    isArchiveDocument,
    isHomeDocument,
    isProjectDocument,
    isProjectListingDocument,
} from '~/utils/prismic/document-type'
import type { VPageProps } from '~/types/prismic'

definePageMeta({
    pageTransition: defaultPageTransition,
})

const { webResponse, title, error } = await useFetchPage()

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

const pageComponent = defineAsyncComponent<Component<VPageProps>>(
    () => import(`~/components/organisms/${pageComponentName}.vue`),
)

// const pageComponent = defineAsyncComponent<Component<VPageProps>>({
//     loader: () => import(`~/components/organisms/${pageComponentName}`),
//     // loadingComponent: LoadingComponent /* shows while loading */,
//     // errorComponent: ErrorComponent /* shows if there's an error */,
//     delay: 0 /* delay in ms before showing loading component */,
//     timeout: 3000 /* timeout after this many ms */,
// })
</script>

<template>
    <div :class="$style.root">
        <Suspense>
            <template #default>
                <component :is="pageComponent" v-if="pageComponent" :web-response="webResponse" />
            </template>
            <template #fallback>
                <p>Loading...</p>
            </template>
        </Suspense>
        <!--        <SliceZone v-if="itemData?.slices" wrapper="main" :slices="itemData.slices" :components="components" />-->
    </div>
</template>

<style lang="scss" module>
.root {
    min-height: 300vh;
}
</style>
