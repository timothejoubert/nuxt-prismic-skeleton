<script setup lang="ts">
import type { PageProps } from '~/types/app'
import type { ProjectListingPageDocument } from '~/prismicio-types'
import { anchor } from '~/constants/anchor'

const props = defineProps<PageProps<ProjectListingPageDocument>>()
const pageData = computed(() => props.prismicDocument.data)

const { data: listingResponse } = await usePrismicProjectDocuments({ fetchOptions: { lazy: false } })
console.log(listingResponse.value, pageData.value)
</script>

<template>
    <VDefaultHeader
        :title="pageData.title"
        :anchor-id="anchor.LISTING_PAGE_PROJECTS_CONTAINER"
    />
    <ul
        :id="anchor.LISTING_PAGE_PROJECTS_CONTAINER"
        :class="$style.list"
    >
        <li
            v-for="projectDocument in listingResponse"
            :key="projectDocument.id"
            :class="$style.item"
        >
            <a href="">
                {{ projectDocument.data?.title }}
            </a>
        </li>
    </ul>
</template>

<style lang="scss" module>
.title {
  position: relative;
}

.list {
  @include property-fluid(margin-top, (xs: 52, xl: 72));

  grid-column: 1 / -1;
  outline: 1px solid black;

  @include media('>=md') {
    grid-column: 1 / -4;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--gutter);
  }
}

.item {
  background-color: color(primary-80);
}
</style>
