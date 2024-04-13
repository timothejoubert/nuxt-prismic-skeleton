<script lang="ts" setup>
import type { PropType } from 'vue'
import { vPrismicImageProps } from '~/components/molecules/VPrismicImage/VPrismicImage.vue'
import { getPrismicImageData, type PrismicImageField } from '~/utils/prismic/prismic-image'

const props = defineProps({
  thumbnail: Object as PropType<PrismicImageField>,
  image: vPrismicImageProps,
  // video: Object as PropType<VVideoProps>,
  video: Object,
  reference: Object as PropType<PrismicImageField>,
})

const referenceProps = computed(() => (props.reference ? getPrismicImageData(props.reference) : undefined))

const src = computed(() => referenceProps.value?.url)
const mediaType = computed(() => referenceProps.value?.mediaType)
const embedPlatform = computed(() => referenceProps.value?.embedPlatform)

// TODO: Create VVideoContainer (add image placeholder and interaction functionality)
const hasInteraction = ref(false)
function onThumbnailClicked() {
  hasInteraction.value = true
}

console.log('media props', props)
</script>

<template>
  <div v-if="thumbnail" :class="$attrs.class">
    <VPrismicImage :reference="thumbnail" v-bind="image" @click="onThumbnailClicked" />
    <VVideoPlayer v-if="hasInteraction" v-bind="video" :is-embed="embedPlatform" />
  </div>
  <!--  <VVideoPlayer v-if="mediaType === 'video' || embedPlatform" :src="src" v-bind="video" :is-embed="embedPlatform" />-->
  <!--  <VPrismicImage v-else-if="mediaType === 'image'" :reference="reference" v-bind="image" :class="$attrs.class" />-->
</template>
