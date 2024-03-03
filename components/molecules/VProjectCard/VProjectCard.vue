<script lang="ts" setup>
import { getProjectYear } from '~/utils/date'
import type { ProjectPageDocument } from '~/prismicio-types'
import type { VCardLayout } from '~/components/molecules/VCard/VCard.vue'

interface VProjectCard {
  project: ProjectPageDocument
  layout?: VCardLayout
  titleClass?: string
  imageProps?: { [key: string]: unknown }
}

const props = defineProps<VProjectCard>()

const cardProps = computed(() => {
  const { main_media, title, creation_date, description } = props.project.data
  const { tags } = props.project

  const sizes =
    props.layout === 'centered' && !props.imageProps?.sizes
      ? 'xs:95vw sm:95vw md:45vw lg:45vw vl:45vw xl:45vw xxl:45vw hd:45vw'
      : undefined
  return {
    image: main_media,
    title,
    titleClass: props.titleClass,
    description,
    tags,
    date: getProjectYear(creation_date),
    layout: props.layout,
    imageProps: { sizes, ...props.imageProps },
  }
})
</script>

<template>
  <VCard v-bind="cardProps" />
</template>
