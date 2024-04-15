<script setup lang="ts">
import { type Content } from '@prismicio/client'

const props = defineProps(getSliceComponentProps<Content.ProjectsFeedSliceSlice>())
const title = computed(() => props.slice.primary?.title)

const { data: listingResponse } = await usePrismicProjectDocuments()
</script>

<template>
  <VProjectsCarousel v-if="listingResponse" :title="title" tag="section" :projects="listingResponse" />
</template>
