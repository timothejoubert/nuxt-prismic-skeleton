<script setup lang="ts">
import type { ImageField, LinkToMediaField } from '@prismicio/types'
import type { FilledLinkToMediaField } from '@prismicio/types/src/value/linkToMedia'
import type { ImgixURLParams } from 'imgix-url-builder'

// https://image.nuxt.com/usage/nuxt-img
// Without provider src relative path are fetch in public directory

interface VBasicImageProps {
    src?: string
    media?: LinkToMediaField | ImageField
    width?: number
    height?: number
    alt?: string
    ratio?: number
    sizes?: string
    widths: number[]
    cropDirection?: ImgixURLParams['crop']
    crop?: string // '100x400'
    fit?: 'cover'
    provider?: string
}

// const img = useImage()
const props = defineProps<VBasicImageProps>()

const mediaFilled = props.media as Partial<FilledLinkToMediaField>

const src = props.src || mediaFilled?.url || ''
const width = Number(props.width || mediaFilled?.width || 1)
const height = Number(props.height || mediaFilled?.height || 1)
const ratio = props.ratio || (width && height && width / height)

const img = ref<ComponentPublicInstance | null>(null)
const loaded = ref(false)

onMounted(() => {
    if (img.value?.$el.complete) loaded.value = true
})

// https://prismic.io/docs/technical-reference/prismicio-vue#prismicimage
const modifiers = {}
if (props.crop) {
    Object.assign(modifiers, {
        fit: 'crop',
        ar: props.crop,
        auto: 'format,compress', // || false,
        // auto: false,
        // crop: 'faces,edges',
    })
}

const options = {
    // provider: props.provider || 'prismic' || 'imgix' || 'ipx',
    widths: props.widths || [375, 675, 1080, 1440],
    imgixParams: modifiers,
}

const formattedSizes =
    typeof props.sizes === 'string' ? props.sizes.split(' ') : props.sizes && Object.values(props.sizes)
const imageSizes = useImage().getSizes(src, options, formattedSizes)

// https://prismic.io/docs/technical-reference/prismicio-vue#prismicimage
// const image = usePrismicImage({ field: mediaFilled, ...options })
// const prismicUrl = image.src.value || ''
// let srcset = ''
// if (props.sizes) {
//     const breakpointSize = props.sizes.split(' ')
//     srcset = breakpointSize.reduce((acc, size, currentIndex) => {
//         const [breakpoint, factor] = size.split(':')
//         const width = Math.floor(getBreakpoints()[breakpoint] * (parseInt(factor) / 100))
//
//         console.log(width)
//         // Replace default height with ratio value
//         const startHeightIndex = prismicUrl.indexOf('height=') + 7
//         const endHeightIndex = prismicUrl.indexOf('&fit=')
//         const height = prismicUrl.substring(startHeightIndex, endHeightIndex)
//         const replacedSrc = prismicUrl.replace(height, Math.floor(width * ratio) + '')
//         console.log(prismicUrl, height)
//
//         acc += replacedSrc + ' ' + width + 'w' + (currentIndex !== breakpointSize.length - 1 ? ',' : '')
//
//         return acc
//     }, '')
// }

const extension = mediaFilled?.name?.split('.').pop()
const $style = useCssModule()

const rootClasses = [
    $style.root,
    ratio && $style['root--ratio'],
    props.fit === 'cover' && $style['root--cover'],
    typeof extension === 'string' && $style[`root--type-${extension}`],
]
</script>

<template>
    <div :class="rootClasses">
        <PrismicImage ref="img" :field="media" v-bind="options" :class="$style.img" />
    </div>
</template>

<style lang="scss" module>
.root {
    display: inline-flex;
    background-color: var(--v-image-background-color, color(grey-100));

    &--type-png {
        --v-image-background-color: initial;
    }
}

.img {
    width: 100%;

    .root--cover & {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>
