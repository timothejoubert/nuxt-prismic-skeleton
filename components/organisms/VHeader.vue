<script lang="ts" setup>
import type { PageContent } from '~/composables/use-fetch-page'

defineProps<{ page: PageContent }>()
</script>

<template>
    <header :class="$style.root" class="container">
        <h1 class="text-h1" :class="$style.title">{{ page.title }}</h1>
        <PrismicRichText class="text-body-l" :field="page.excerpt" :class="$style.content" />
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
</style>
