<script setup lang="ts">
import { type Content } from '@prismicio/client'
import type { VSliceHeadProps } from '~/components/molecules/VSliceHead/VSliceHead.vue'

const props = defineProps(getSliceComponentProps<Content.AboutSliceSlice>(['slice', 'index', 'slices', 'context']))
const sliceData = computed(() => props.slice.primary)

const headProps = computed(() => {
    return {
        title: sliceData.value.title || '',
        linkLabel: sliceData.value.link_label,
        externalLinkReference: sliceData.value.external_link,
        internalLinkReference: sliceData.value.internal_link,
    } as VSliceHeadProps
})
</script>

<template>
    <VSlice :slice="slice">
        <VSliceHead v-bind="headProps" />
        <VText
            :content="sliceData.content"
            :class="$style.content"
            class="text-body-lg"
        />
    </VSlice>
</template>

<style lang="scss" module>
.content {
  max-width: 32ch;
}
</style>
