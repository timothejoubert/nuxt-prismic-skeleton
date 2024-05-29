<script setup lang="ts">
import type { PageProps } from '~/types/app'
import type { ProjectListingPageDocument } from '~/prismicio-types'

const props = defineProps<PageProps<ProjectListingPageDocument>>()
const pageData = computed(() => props.prismicDocument.data)

const { data: listingResponse } = await usePrismicProjectDocuments({ fetchOptions: { lazy: false } })
</script>

<template>
  <div>Project listing page</div>
</template>

<style lang="scss" module></style>
