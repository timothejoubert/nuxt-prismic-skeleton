<script setup lang="ts">
import { type Content } from '@prismicio/client'

const props = defineProps(getSliceComponentProps<Content.ContactSliceSlice>(['slice', 'index', 'slices', 'context']))
const sliceData = computed(() => props.slice.primary)

console.log('contactSliceData', sliceData.value)
</script>

<template>
    <VSlice
        :slice="slice"
        :class="$style.root"
    >
        <VSliceHead
            :title="sliceData.title"
            :class="$style.head"
        />
        <VText
            :content="sliceData.content"
            :class="$style.content"
            class="text-body-lg"
        />
        <ul :class="$style.infos">
            <li />
        </ul>
    </VSlice>
</template>

<style lang="scss" module>
.root {
    display: grid;
    gap: 0 rem(48);
    grid-template-columns: 1fr 1fr;
}

.head {
    grid-column: 1 / -1;
}

.content {
    grid-column: 1 / -1;

    @include media('>=md') {
        grid-column: span 1;
    }
}

.infos {
    min-height: rem(100);
    border: 1px solid black;
    margin-top: rem(32);
    grid-column: 1 / -1;

    @include media('>=md') {
        margin-top: initial;
        grid-column: span 1;
    }
}
</style>
