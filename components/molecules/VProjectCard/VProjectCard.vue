<script lang="ts" setup>
import type { ProjectPageDocument } from '~/prismicio-types'
import { getCardProjectProps } from '~/utils/prismic/project'
import { NuxtLink } from '#components'
import type { VCardLayout } from '~/components/molecules/VCard/VCard'

interface VProjectCard {
  project: ProjectPageDocument
  layout?: VCardLayout
  titleClass?: string
}

const props = defineProps<VProjectCard>()

const { getLocalizedUrl } = useLocale()
const path = computed(() => getLocalizedUrl(`/projets/${props.project.uid}`))

const parsedProjectProps = computed(() => getCardProjectProps(props.project))
</script>

<template>
  <VCard v-bind="parsedProjectProps" :layout="layout" :tag="NuxtLink" :title-class="titleClass" :to="path">
    <slot />
  </VCard>
</template>
