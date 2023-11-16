<script lang="ts" setup>
import type { ImageField, LinkToMediaField } from '@prismicio/types'
import type { ProjectDocument } from '~/prismicio-types'
import { NuxtLink } from '#components'
// import type { UnionToIntersection } from '~/utils/types'

type PrismicMedia = LinkToMediaField | ImageField

interface VMediaProps {
    url: string
    prismicMedia?: PrismicMedia
    width?: string | null
    height?: string | null
    alt?: string
    copyright?: string
    size?: string
}

interface VProjectCardRowProps {
    title?: string
    media?: VMediaProps | PrismicMedia
    url?: string
    year?: string
    tags?: string[]
}

interface VProjectCardPrismicProps {
    prismicProject?: ProjectDocument
}

// TODO: prismic or row prop not working

type VProjectCardProps =
    | ({
          layout: 'default' | 'condensed'
      } & VProjectCardRowProps)
    | VProjectCardPrismicProps

const props = defineProps<VProjectCardProps>()

function parseProjectDocumentData(document: ProjectDocument | undefined) {
    if (!document) return { title: undefined, year: undefined, tags: undefined, url: undefined, media: undefined }
    const { data } = document

    return {
        title: data.title,
        year: data.creation, // TODO: Get year from full date format
        tags: document.tags,
        url: document.url,
        media: data.main_media,
    }
}

const {
    title: prismicTitle,
    year: prismicYear,
    tags: prismicTags,
    url: prismicUrl,
    media: prismicMedia,
} = parseProjectDocumentData(props.prismicProject)

const title = props.title || prismicTitle
const year = props.year || prismicYear
const url = props.url || prismicUrl
const media = props.media || prismicMedia
const tags = props.tags || prismicTags

const rootAttribute = {
    component: url ? NuxtLink : 'div',
    to: url,
}
</script>

<template>
    <component :is="rootAttribute.component" :to="rootAttribute.to">
        <img :src="media.url" alt="" :class="$style.media" />
        <div :class="$style.information">
            <h3>{{ title }}</h3>
            <span>{{ year }}</span>
            <span v-for="tag in tags" :key="tag">{{ tag }}</span>
        </div>
    </component>
</template>

<style lang="scss" module>
// .root {
// }

.media {
    width: 100%;
    aspect-ratio: 439 / 302;
}

.information {
    display: flex;
    align-items: center;
}

.information > * {
    position: relative;

    &::after {
        position: relative;
        content: '|';
        margin-inline: rem(4);
    }

    &:last-child::after {
        display: none;
    }
}
</style>
