<script setup lang="ts">
import { defaultPageTransition } from '~/transitions/default-page-transition'
import { components } from '~/slices'
import { getPrismicLinkProps } from '~/utils/prismic/link'
import { isHomeDocument } from '~/utils/types/document-type'

const { webResponse, itemData, title, error } = await useFetchPage()

if (error) {
    showError(error)
}

definePageMeta({
    pageTransition: defaultPageTransition,
})

usePage({ title, webResponse })

const ctaLink = webResponse && getPrismicLinkProps(webResponse)

// Page
const isHome = isHomeDocument(webResponse?.type) || webResponse?.url === '/'
const isArchive = itemData?.type === 'Archives'
const isProjectListing = itemData?.type === 'Project listing'
const pageComponent = isHome ? 'VHome' : isProjectListing ? 'VProjectListing' : 'VPageDefault'

// Header
const headerProps = itemData && {
    title: itemData.title,
    content: itemData.excerpt,
    asideContent: itemData.content,
    media: itemData.media,
}
console.log('webResponse', webResponse)
</script>

<template>
    <div :class="$style.root">
        <component :is="pageComponent" v-if="webResponse" :web-response="webResponse">
            <VHeader v-if="itemData" v-bind="headerProps" />
        </component>

        <VButtonLink v-bind="ctaLink" />
        <!--        <SliceZone v-if="itemData?.slices" :slices="itemData.slices" :components="components" />-->
    </div>
</template>

<style lang="scss" module>
.root {
    position: relative;
    overflow: auto;
    min-height: var(--min-page-content-height);
}
</style>
