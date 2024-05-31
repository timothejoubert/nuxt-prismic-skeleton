<script lang="ts" setup>
import type { HomePageDocument } from '~/prismicio-types'
import type { PageProps } from '~/types/app'

const props = defineProps<PageProps<HomePageDocument>>()
const homeItem = computed(() => props.prismicDocument.data)
</script>

<template>
  <div>
    <VPrismicImage :reference="homeItem.image">
      <VText tag="h1" :content="homeItem.title" />
      <VText :content="homeItem.content" />
      <VPrismicVideo :reference="homeItem.embed" hide-thumbnail loop />
      <pre>{{ homeItem.embed }}</pre>
      <VPictureSource
        :media="`(max-width: ${getBreakpointValue('md') - 1}px)`"
        :modifiers="{
          crop: 'edges',
          fit: 'cover',
          width: '300',
          height: '400',
        }"
        sizes="xs:100vw sm:100vw md:100vw"
      />
      <VPictureSource
        :modifiers="{
          crop: 'edges',
          fit: 'cover',
          width: '600',
          height: '500',
        }"
        sizes="lg:100vw xxl:100vw qhd:100vw"
      />
    </VPrismicImage>
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
