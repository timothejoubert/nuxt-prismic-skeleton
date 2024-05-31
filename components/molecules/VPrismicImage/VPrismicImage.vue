<script lang="ts">
import type { PropType } from 'vue'
import { imgProps } from '#image/components/nuxt-img'
import { pictureProps } from '#image/components/nuxt-picture'
import { VImg, VPicture } from '#components'
import {
  getReferenceAltText,
  getReferenceCopyright,
  getReferenceDimension,
  getReferenceUrl,
  type PrismicImageField,
} from '~/utils/prismic/prismic-media'
import { pick } from '~/utils/object/pick'

const providerAttributes = {}

export const vRoadizImageProps = {
  ...providerAttributes,
  ...imgProps,
  ...pictureProps,
  reference: Object as PropType<PrismicImageField>,
  tag: String as PropType<'picture' | 'img'>,
  copyright: [String, Boolean],
  imageAverageColor: String,
}

export default defineComponent({
  props: vRoadizImageProps,
  setup(props, { slots }) {
    const $style = useCssModule()

    // Image infos
    const href = computed(() => props.src || getReferenceUrl(props.reference))

    // const modifiers = computed(() => {
    //   const result: Record<string, unknown> = { ...props.modifiers }
    //
    //   if (props?.width && props?.height) {
    //     Object.assign(result, {
    //       crop: 'edges',
    //     })
    //   }
    // })

    const width = computed(
      () => props?.modifiers?.width || props?.width || getReferenceDimension(props.reference)?.width,
    )
    const height = computed(
      () => props?.modifiers?.height || props?.height || getReferenceDimension(props.reference)?.height,
    )
    const copyright = computed(
      () =>
        (typeof props.copyright === 'string' && props.copyright) ||
        (props.copyright === true && getReferenceCopyright(props.reference)),
    )

    const isPicture = computed(() => !!slots.default || props.tag === 'picture')
    const displayedComponentProps = computed(() => Object.keys(isPicture.value ? pictureProps : imgProps))

    const $img = useImage()
    const imageComponentProps = computed(() => {
      return {
        ...pick(props, displayedComponentProps.value),
        src: href.value,
        width: width.value,
        height: height.value,
        alt: getReferenceAltText(props.reference),
        placeholder: props.imageAverageColor || '#E9E9E9',
        sizes:
          props.sizes ||
          (!isPicture.value && !props.densities && ($img.options.presets?.default?.sizes || $img.options.screens)) ||
          undefined,
        provider: 'imgix', // Use ipx under the hood
        modifiers: {
          ...props.modifiers,
          format: props.format || 'webp',
        },
      }
    })

    const imageComponent = h(isPicture.value ? VPicture : VImg, imageComponentProps.value, slots.default)

    return () => {
      if (copyright.value) {
        return h('figure', { class: [$style.root, $style['root--copyright']] }, [
          imageComponent,
          h('figcaption', copyright.value),
        ])
      }

      return imageComponent
    }
  },
})
</script>

<style lang="scss" module>
.root {
  &--copyright {
    position: relative;
  }
}
</style>

<!--<script lang="ts">-->
<!--import type { PropType } from 'vue'-->
<!--import { imgProps } from '#image/components/nuxt-img'-->
<!--import { NuxtImg, VPicture } from '#components'-->
<!--import { getPrismicMediaData, type PrismicImageField } from '~/utils/prismic/prismic-media'-->

<!--export const vPrismicImageProps = {-->
<!--  ...imgProps,-->
<!--  // Override imgProps type-->
<!--  imgAttrs: Object,-->
<!--  src: String,-->
<!--  reference: Object as PropType<PrismicImageField>,-->
<!--  tag: String as PropType<'picture' | 'img'>,-->
<!--  copyright: { type: [Boolean, String], default: false },-->
<!--}-->

<!--export default defineComponent({-->
<!--  props: vPrismicImageProps,-->
<!--  setup(props, { slots }) {-->
<!--    const $style = useCssModule()-->

<!--    const prismicMediaData = computed(() => getPrismicMediaData(props.reference))-->
<!--    const src = computed(() => props.src || prismicMediaData.value?.url)-->

<!--    const width = computed(() => props?.width || prismicMediaData.value?.width)-->
<!--    const height = computed(() => props?.height || prismicMediaData.value?.height)-->
<!--    const aspectRatio = computed(() => {-->
<!--      if (!width.value || !height.value) return 1-->

<!--      return +width.value / +height.value-->
<!--    })-->

<!--    if (!src.value) {-->
<!--      return () => {-->
<!--        return h('div', {-->
<!--          style: { '&#45;&#45;v-prismic-image-aspect-ratio': aspectRatio.value },-->
<!--          class: $style.placeholder,-->
<!--        })-->
<!--      }-->
<!--    }-->

<!--    const modifiers = computed(() => {-->
<!--      const result: Record<string, unknown> = { ...props.modifiers }-->

<!--      if (props?.width && props?.height) {-->
<!--        Object.assign(result, {-->
<!--          crop: 'edges',-->
<!--        })-->
<!--      }-->

<!--      return result-->
<!--    })-->

<!--    const copyright = computed(() => {-->
<!--      if (typeof props.copyright === 'string') return props.copyright-->
<!--      return props.copyright ? prismicMediaData.value?.copyright : undefined-->
<!--    })-->

<!--    const documentProps = computed(() => {-->
<!--      return {-->
<!--        imgAttrs: props.imgAttrs,-->
<!--        src: src.value,-->
<!--        width: width.value,-->
<!--        height: height.value,-->
<!--        alt: props.alt || prismicMediaData.value?.alt,-->
<!--        copyright: copyright.value,-->
<!--        modifiers: modifiers.value,-->
<!--        sizes: props.sizes || useImage().options.presets.default?.sizes,-->
<!--        provider: props.provider || 'imgix',-->
<!--        fit: props.fit || 'cover',-->
<!--        placeholder: '/images/placeholder.jpg',-->
<!--      }-->
<!--    })-->

<!--    return () => {-->
<!--      const isPicture = slots.default && props.tag !== 'img'-->

<!--      const imageComponent = h(-->
<!--        isPicture ? VPicture : NuxtImg,-->
<!--        {-->
<!--          ...documentProps.value,-->
<!--          class: [$style.root],-->
<!--          sizes: isPicture ? undefined : documentProps.value.sizes,-->
<!--        },-->
<!--        slots.default,-->
<!--      )-->

<!--      if (copyright.value) {-->
<!--        return h(-->
<!--          'figure',-->
<!--          {-->
<!--            class: $style.figure,-->
<!--          },-->
<!--          [imageComponent, h('figcaption', copyright.value)],-->
<!--        )-->
<!--      }-->

<!--      return imageComponent-->
<!--    }-->
<!--  },-->
<!--})-->
<!--</script>-->

<!--<style lang="scss" module>-->
<!--.root {-->
<!--  width: var(&#45;&#45;v-roadiz-image-width, 100%);-->

<!--  img {-->
<!--    width: var(&#45;&#45;v-roadiz-image-width);-->
<!--  }-->
<!--}-->

<!--.figure {-->
<!--  position: relative;-->
<!--}-->

<!--.placeholder {-->
<!--  background-color: #e8e8e8;-->
<!--  aspect-ratio: var(&#45;&#45;v-prismic-image-aspect-ratio);-->
<!--  width: 100%;-->
<!--  height: auto;-->
<!--}-->
<!--</style>-->
