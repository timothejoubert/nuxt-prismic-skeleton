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
        placeholder: props.placeholder || props.imageAverageColor || '#E9E9E9',
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
