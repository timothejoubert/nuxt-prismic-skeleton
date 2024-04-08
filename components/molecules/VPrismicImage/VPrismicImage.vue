<script lang="ts">
import type { PropType } from 'vue'
import { imgProps } from '#image/components/nuxt-img'
import { NuxtImg, VPicture } from '#components'
import { getPrismicImageData, type PrismicImageField } from '~/utils/prismic/prismic-image'

export const vPrismicImageProps = {
  ...imgProps,
  // Override imgProps type
  src: String,
  reference: Object as PropType<PrismicImageField>,
  tag: String as PropType<'picture' | 'img'>,
  copyright: { type: [Boolean, String], default: false },
}

export default defineComponent({
  props: vPrismicImageProps,
  setup(props, { slots }) {
    const $style = useCssModule()

    const prismicMediaData = computed(() => getPrismicImageData(props.reference))
    const src = computed(() => props.src || prismicMediaData.value?.url)

    if (!src.value) return () => h('')

    const width = computed(() => props?.width || prismicMediaData.value?.width)
    const height = computed(() => props?.height || prismicMediaData.value?.height)

    const copyright = computed(() => {
      if (typeof props.copyright === 'string') return props.copyright
      return props.copyright ? prismicMediaData.value?.copyright : undefined
    })

    const $img = useImage()
    const size = props.sizes || $img.options.presets.default?.sizes

    const documentProps = computed(() => {
      return {
        ...props,
        src: src.value,
        width: width.value,
        height: height.value,
        alt: props.alt || prismicMediaData.value?.alt,
        placeholder: '/images/placeholder.jpg',
        copyright: copyright.value,
        provider: 'imgix',
        size: size.value,
        modifiers: props.modifiers,
      }
    })

    return () => {
      const isPicture = slots.default || props.tag === 'picture'

      const imageComponent = h(
        isPicture ? VPicture : NuxtImg,
        {
          ...documentProps.value,
          class: $style.root,
        },
        slots.default,
      )

      if (copyright.value) {
        return h(
          'figure',
          {
            class: $style.figure,
          },
          [imageComponent, h('figcaption', copyright.value)],
        )
      }

      return imageComponent
    }
  },
})
</script>

<style lang="scss" module>
.root {
  img {
    width: var(--v-roadiz-image-width);
  }
}

.figure {
  position: relative;
}
</style>
