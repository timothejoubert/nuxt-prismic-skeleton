<script setup lang="ts"></script>

<template>
    <NuxtStory>
        <template #settings>Style are updated on XL breakpoint from css</template>
        <NuxtStoryVariant title="Update button emphasis">
            <template #info
                >use <strong>v-button-primary | v-button-secondary | v-button-ternary</strong> mixin when emphasis are
                updated on media-query breakpoint</template
            >
            <VButton label="Button label" icon-name="chevron-right" :class="$style['button-emphasis-updated']" />
        </NuxtStoryVariant>
        <NuxtStoryVariant title="Update button size">
            <VButton
                label="Button label"
                size="s"
                emphasis="primary"
                icon-name="chevron-right"
                :class="$style['button-size-updated']"
            />
        </NuxtStoryVariant>
    </NuxtStory>
</template>

<style lang="scss" module>
.button-emphasis-updated {
    @include media('<xl') {
        @include v-button-primary('xl');
    }

    @include media('>=xl') {
        @include v-button-secondary('s');
    }
}

.button-size-updated {
    @include media('>=xl') {
        @include v-button-css-vars-by-size($v-button, 'xl');
    }
}
</style>
