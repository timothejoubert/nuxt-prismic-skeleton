<script lang="ts" setup>
import type { PropType } from 'vue'
import type { ImageOptions } from '@nuxt/image'
import type { VPictureVNodeProps } from '~/components/molecules/VPicture/VPicture.vue'

const props = defineProps({
  media: String,
  src: String,
  srcset: String,
  format: String,
  quality: String,
  sizes: String,
  fit: String,
  width: [String, Number],
  height: [String, Number],
  modifiers: Object as PropType<Record<string, any>>,
})

const pictureVNodeProps = inject<VPictureVNodeProps>('pictureVNodeProps')
const $img = useImage()

const options: ImageOptions = {
  modifiers: {
    ...pictureVNodeProps?.modifiers,
    ...props.modifiers,
    fit: props.fit || props.modifiers?.fit || pictureVNodeProps.fit,
    width: props.width || props.modifiers?.width || pictureVNodeProps?.width,
    height: props.height || props.modifiers?.height || pictureVNodeProps?.height,
    quality:
      props.quality || props.modifiers?.quality || pictureVNodeProps?.quality || pictureVNodeProps?.modifiers?.quality,
    format:
      props.format ||
      props.modifiers?.format ||
      pictureVNodeProps?.format ||
      pictureVNodeProps?.modifiers?.format ||
      'webp',
  },
  provider: pictureVNodeProps?.provider,
  preset: pictureVNodeProps?.preset,
  // TODO: open issue on nuxt/image because the sizes is not into the options in the docs
  sizes: props.sizes,
}
const computedSrc = computed(() => props.src || pictureVNodeProps?.src)
const imgSizes = computed(() => $img.getSizes(computedSrc.value as string, options))
const computedSrcset = computed(() => imgSizes.value.srcset)
</script>

<template>
  <source :media="media" :srcset="computedSrcset" />
</template>
