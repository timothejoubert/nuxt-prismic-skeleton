<script lang="ts" setup>
import type { WebPageDocument } from '~/prismicio-types'
import type { PageProps } from '~/types/app'

const props = defineProps<PageProps<WebPageDocument>>()
const pageItem = computed(() => props.prismicDocument.data)

if (!pageItem.value) {
    showError({ status: 404, message: 'Aucune page de type default n\'existe via cette url' })
}
</script>

<template>
    <div
        v-if="pageItem"
        :class="$style.root"
    >
        <VText :content="pageItem.title" />
        <VText :content="pageItem.content" />
        <VPrismicImage :reference="pageItem.image">
            <VPictureSource
                :media="`(max-width: ${getBreakpointValue('md') - 1}px)`"
                :modifiers="{
                    crop: 'edges',
                    fit: 'cover',
                    width: '300',
                    height: '400',
                }"
                sizes="xs:100vw sm:100vw md:100vw"
            />
            <VPictureSource
                :modifiers="{
                    crop: 'edges',
                    fit: 'cover',
                    width: '600',
                    height: '500',
                }"
                sizes="lg:100vw xxl:100vw qhd:100vw"
            />
        </VPrismicImage>
        <VPrismicVideo
            :reference="pageItem.embed_youtbe"
            hide-thumbnail
            loop
        />
        <VPrismicVideo
            :reference="pageItem.embed_vimeo"
            hide-thumbnail
            loop
        />
        <VPrismicVideo
            :reference="pageItem.native_video"
            hide-thumbnail
            loop
        />
        <VPrismicVideo
            :reference="pageItem.embed_youtbe"
            :thumbnail="pageItem.image"
            loop
        />
        <VPrismicVideo
            :reference="pageItem.embed_vimeo"
            :thumbnail="pageItem.image"
            loop
        />
        <VPrismicVideo
            :reference="pageItem.native_video"
            :thumbnail="pageItem.image"
            loop
        />
    </div>
</template>

<style lang="scss" module>
.root {
  > * {
    margin-block: rem(50);
  }
}
</style>
