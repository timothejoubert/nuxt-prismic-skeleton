<script lang="ts" setup>
import type { HomePageDocument } from '~/prismicio-types'
import type { PageProps } from '~/types/app'

const props = defineProps<PageProps<HomePageDocument>>()
const homeItem = computed(() => props.prismicDocument.data)
</script>

<template>
  <div>
    <VText tag="h1" :content="homeItem.title" />
    <VText :content="homeItem.content" />
    <VPrismicImage
      :reference="homeItem.image"
      :modifiers="{
        crop: 'edges',
        fit: 'cover',
        width: '200',
        height: '500',
      }"
    />
  </div>
</template>
