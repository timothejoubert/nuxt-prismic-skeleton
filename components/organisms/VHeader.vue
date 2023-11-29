<script lang="ts" setup>
import type { LinkToMediaField, RichTextField } from '@prismicio/types'

interface VHeaderProps {
    title: string
    content?: RichTextField
    asideContent?: RichTextField
    media?: LinkToMediaField
}
defineProps<VHeaderProps>()
</script>

<template>
    <header :class="$style.root" class="container">
        <h1 class="text-h1" :class="$style.title">{{ title }}</h1>
        <PrismicRichText v-if="content" class="text-body-l" :field="content" :class="$style.content" />
        <div :class="$style.aside">
            <PrismicRichText
                v-if="asideContent"
                class="text-body-l"
                :field="asideContent"
                :class="$style['aside__content']" />
        </div>
    </header>
</template>

<style lang="scss" module>
@use 'sass:math';

.root {
    margin-block: rem(24) rem(64);
}

.title {
    margin-bottom: rem(19);
}

.content {
    width: min(100%, rem(500));

    @include media('>=lg') {
        width: min(#{math.div(600, 1440) * 100%}, rem(800));
    }
}

.aside {
    background-color: lightgrey;
}
</style>
