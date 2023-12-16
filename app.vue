<script setup lang="ts">
useSetPreferReduceMotion()
const { allGlobalStyle } = useGlobalCssVar()
</script>

<template>
    <div :class="$style.root" :style="allGlobalStyle">
        <!--            <NuxtLoadingIndicator :height="5" color="yellow" />-->
        <VGridVisualizer :class="$style['grid-visualizer']" />
        <VMainNav :class="$style.nav" />
        <NuxtPage :class="$style.page" />
        <VFooter :class="$style.footer" />
    </div>
</template>

<style lang="scss" module>
.root {
    --grid-aside-column: -4 / -1;
    --grid-page-column: 1 / -1;

    position: relative;

    @include media('>=lg') {
        --grid-page-column: 1 / -4;
    }
}

.grid-visualizer {
    position: absolute;
    grid-column: 1 / -1;
    inset: 0;
    margin-inline: var(--grid-margin-inline);
}

.page {
    position: relative;
    min-height: var(--min-page-content-height);
    grid-column: var(--grid-page-column);
    grid-row: 1;
}

.nav {
    position: sticky;
    z-index: 101;
    top: 0;
    width: calc((#{flex-margin-grid-value(3, 14)}) + var(--grid-margin-inline));
    margin-left: auto;
    background-color: color(primary);
    overflow-x: clip;

    &::after {
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 100lvh;
        background-color: color(dark);
        content: '';
    }
}

.footer {
    --fullscreen-background-color: #{color(dark)};

    @include fullscreen-background;

    grid-column: 1 / -1;
}
</style>
