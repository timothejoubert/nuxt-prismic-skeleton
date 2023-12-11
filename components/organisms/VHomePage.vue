<script lang="ts" setup>
import type { VPageProps } from '~/types/prismic'
import type { HomePageDocumentData } from '~/prismicio-types'
import { customSerializer } from '~/utils/prismic/rich-text-serializer'

const props = defineProps<VPageProps<HomePageDocumentData>>()
const data = computed(() => props.webResponse.data)
</script>

<template>
    <header :class="$style.root" class="grid">
        <VHeaderTitle v-if="data.title" class="text-h1 grid-page-content" :class="$style.title" :content="data.title" />
        <VImg :media="data.header_media" :class="$style['header-media']" crop="295x587" :widths="[375, 600, 1020]" />
        <PrismicRichText
            :class="$style.tagline"
            :serializer="customSerializer('h2')"
            :field="data.tagline"
            fallback="La tagline n'est pas remplie" />
    </header>
</template>

<style lang="scss" module>
@use 'sass:math';

.root {
}

.title {
    position: relative;
    min-height: calc(100vw / (587 / 295));
}

.header-media {
    grid-column: 1 / -1;

    @include media('>=lg') {
        grid-column: var(--grid-aside-column);
        width: calc(100% + var(--grid-margin-inline));
    }
}

.tagline {
    padding-block: rem(130) rem(84);
    grid-column: var(--grid-page-column);
    border-top: 1px solid color(dark);
    border-bottom: 1px solid color(dark);

    > * {
        max-width: 20ch;
    }
}
</style>
