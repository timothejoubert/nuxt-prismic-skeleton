<script setup lang="ts">
import type { ImageOptions } from '@nuxt/image'
import nuxtImageProps from '~/utils/image/nuxt-image-props'
import { VImage } from '#components'

type VImageProps = InstanceType<typeof VImage>['$props']

type VImageSourceProps = { media: string; src: string } & typeof nuxtImageProps & Omit<VImageProps, ''>

const props = defineProps<VImageSourceProps>()

const src = props.src

const media = props.media
// const interventionRequestKeys = Object.keys(interventionRequestProps)
// const modifiersKeys = [...interventionRequestKeys, 'format', 'quality', 'background', 'fit', 'modifiers'].filter(
//     (key) => !['width', 'height'].includes(key),
// )
const modifiers: Record<string, unknown> = {}
// modifiersKeys.forEach((key) => {
//     if (typeof props[key as keyof typeof props] !== 'undefined') modifiers[key] = props[key as keyof typeof props]
// })

if (!props.align && props.document?.imageCropAlignment) modifiers.align = props.document.imageCropAlignment

const img = useImage()
const options: ImageOptions = {
    provider: props.provider || 'interventionRequest',
    preset: props.preset,
    modifiers: { ...modifiers, ...props.modifiers },
    sizes: props.sizes || img.options.screens,
}

const formattedSizes =
    typeof props.sizes === 'string' ? props.sizes.split(' ') : props.sizes && Object.values(props.sizes)

const sizes = computed(() => img.getSizes(src, options, formattedSizes))

const sourceAttrs = computed(() => ({
    media,
}))

const hasWebp = computed(() => props.format !== 'webp' && !src.endsWith('.webp'))

const webpSizes = computed(() =>
    img.getSizes(src, { ...options, modifiers: { ...options.modifiers, format: 'webp' } }, formattedSizes),
)
</script>

<template>
    <source v-if="hasWebp" v-bind="sourceAttrs" :srcset="webpSizes.srcset" type="image/webp" />
    <source v-bind="sourceAttrs" :srcset="sizes.srcset" />
</template>
