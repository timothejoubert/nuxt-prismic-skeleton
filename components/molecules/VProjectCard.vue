<script lang="ts" setup>
import type { ImageField, LinkToMediaField } from '@prismicio/types'
import type { ProjectDocument } from '~/prismicio-types'
import { parseProjectDocumentData } from '~/utils/prismic/document-project'
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
    prismicProject?: ProjectDocument
}

// type VProjectCardProps =
//     | ({
//           layout: 'default' | 'condensed'
//       } & VProjectCardRowProps)
//     | {
//           prismicProject: ProjectDocument
//       }

const props = defineProps<VProjectCardRowProps>()

const { projectTitle, projectYear, projectTags, projectUrl, projectMedia } = parseProjectDocumentData(
    props.prismicProject,
)

const title = props.title || projectTitle
const year = props.year || projectYear
const tags = props.tags || projectTags
const url = props.url || projectUrl
const media = props.media || projectMedia
</script>

<template>
    <VLink :url="url" :reference="prismicProject">
        <img :src="media.url" alt="" :class="$style.media" />
        <div :class="$style.information">
            <h3>{{ title }}</h3>
            <span>{{ year }}</span>
            <span v-for="tag in tags" :key="tag">{{ tag }}</span>
        </div>
    </VLink>
</template>

<style lang="scss" module>
// .root {
// }

.media {
    width: 100%;
    aspect-ratio: 439 / 302;
    background-color: rgba(255, 255, 255, 0.15);
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
