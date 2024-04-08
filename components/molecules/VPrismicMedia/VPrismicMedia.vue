<script lang="ts" setup>
import type { PropType } from 'vue'
import type { VVideoProps } from '~/components/molecules/VVideo/VVideo.vue'
import { vPrismicImageProps } from '~/components/molecules/VPrismicImage/VPrismicImage.vue'
import { getPrismicImageData, type PrismicImageField } from '~/utils/prismic/prismic-image'

const props = defineProps({
  image: vPrismicImageProps,
  video: Object as PropType<VVideoProps>,
  reference: Object as PropType<PrismicImageField>,
})

const referenceProps = computed(() => (props.reference ? getPrismicImageData(props.reference) : undefined))

const src = computed(() => referenceProps.value?.url)
const mediaType = computed(() => referenceProps.value?.mediaType)
const embedPlatform = computed(() => referenceProps.value?.embedPlatform)

// TODO: Create VVideoContainer (add image placeholder and interaction functionality)
</script>

<template>
  <template v-if="src">
    <VVideoPlayer v-if="mediaType === 'video' || embedPlatform" :src="src" v-bind="video" :is-embed="embedPlatform" />
    <VPrismicImage v-else-if="mediaType === 'image'" :reference="reference" v-bind="image" />
  </template>
</template>
