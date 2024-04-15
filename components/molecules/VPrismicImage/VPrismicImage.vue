<script lang="ts">
import type { PropType } from 'vue'
import { imgProps } from '#image/components/nuxt-img'
import { NuxtImg, VPicture } from '#components'
import { getPrismicImageData, type PrismicImageField } from '~/utils/prismic/prismic-image'

export const vPrismicImageProps = {
  ...imgProps,
  // Override imgProps type
  imgAttrs: Object,
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

    const width = computed(() => props?.width || prismicMediaData.value?.width)
    const height = computed(() => props?.height || prismicMediaData.value?.height)
    const aspectRatio = computed(() => {
      if (!width.value || !height.value) return 1

      return +width.value / +height.value
    })

    if (!src.value) {
      return () => {
        return h('div', {
          style: { '--v-prismic-image-aspect-ratio': aspectRatio.value },
          class: $style.placeholder,
        })
      }
    }

    const modifiers = computed(() => {
      const result: Record<string, unknown> = { ...props.modifiers }

      if (props?.width && props?.height) {
        Object.assign(result, {
          crop: 'edges',
        })
      }

      return result
    })

    const copyright = computed(() => {
      if (typeof props.copyright === 'string') return props.copyright
      return props.copyright ? prismicMediaData.value?.copyright : undefined
    })

    const documentProps = computed(() => {
      return {
        imgAttrs: props.imgAttrs,
        src: src.value,
        width: width.value,
        height: height.value,
        alt: props.alt || prismicMediaData.value?.alt,
        copyright: copyright.value,
        modifiers: modifiers.value,
        sizes: props.sizes || useImage().options.presets.default?.sizes,
        provider: props.provider || 'imgix',
        fit: props.fit || 'cover',
        placeholder: '/images/placeholder.jpg',
      }
    })

    return () => {
      const isPicture = slots.default || props.tag === 'picture'

      const imageComponent = h(
        isPicture ? VPicture : NuxtImg,
        {
          ...documentProps.value,
          class: [$style.root],
          sizes: isPicture ? undefined : documentProps.value.sizes,
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
  width: var(--v-roadiz-image-width);
  img {
    width: var(--v-roadiz-image-width);
  }
}

.figure {
  position: relative;
}

.placeholder {
  background-color: #e8e8e8;
  aspect-ratio: var(--v-prismic-image-aspect-ratio);
  width: 100%;
  height: auto;
}
</style>
