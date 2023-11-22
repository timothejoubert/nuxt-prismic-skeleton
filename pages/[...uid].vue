<script setup lang="ts">
import type { PrismicDocument } from '@prismicio/types'
import { defaultPageTransition } from '~/transitions/default-page-transition'
import { components } from '~/slices'

const { webResponse, itemData, title } = await useFetchPage()

definePageMeta({
    pageTransition: defaultPageTransition,
})

usePage({ title, webResponse })

const isProjectListing = itemData?.type === 'Project listing'
// const isArchive = itemData?.type === 'Archives'

const ctaLink = getPrismicLinkProps(webResponse)

function getPrismicLinkProps(document: PrismicDocument) {
    // TODO: can accept prismic linkField (document, webUrl, relationField)

    const url = document?.url || document?.uid || '/'
    const label = document.data?.title || 'default PrismicLink label'

    return { url, label }
}
</script>

<template>
    <div :class="$style.root">
        <VHeader v-if="itemData" :page="itemData" />
        <VButtonLink v-bind="ctaLink" />
        <VProjectListing v-if="isProjectListing" />
        <SliceZone v-if="itemData.slices" :slices="itemData.slices" :components="components" />
    </div>
</template>

<style lang="scss" module>
.root {
    position: relative;
    overflow: auto;
    min-height: var(--min-page-content-height);
}
</style>
