<script setup lang="ts">
import { type Content } from '@prismicio/client'

const props = defineProps(getSliceComponentProps<Content.ProjectsFeedSliceSlice>())
const sliceData = computed(() => props.slice.primary)

const { data: listingResponse } = await usePrismicProjectDocuments()
</script>

<template>
    <VSlice :slice="slice">
        <VSliceHead :title="sliceData.title" />
        <VText
            v-if="sliceData.content"
            :content="sliceData.content"
            class="text-body-lg"
        />
        <!--        <VProjectsCarousel -->
        <!--            v-if="listingResponse" -->
        <!--            :title="title" -->
        <!--            tag="section" -->
        <!--            :projects="listingResponse" -->
        <!--        /> -->
    </VSlice>
</template>
