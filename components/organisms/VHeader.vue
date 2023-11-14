<script lang="ts" setup>
import type { PageContent } from "~/composables/use-fetch-page";

defineProps<{ page: PageContent }>();
</script>

<template>
    <header :class="$style.root">
        <h1 class="text-h1">{{ page.title }}</h1>
        <PrismicRichText
            class="text-h3"
            :field="page.excerpt"
            :class="$style.content"
        />
    </header>
</template>

<style lang="scss" module>
@use "sass:math";

.root {
    margin-block: rem(24) rem(64);
}

.content {
    max-width: math.div(560, 1440) * 100%;
}
</style>
