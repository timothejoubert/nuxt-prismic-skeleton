<script lang="ts">
import { pictureProps } from '#image/components/nuxt-picture'
import type { ExtractPropTypes } from 'vue'
import { NuxtImg, NuxtPicture } from '#components'
import { getHtmlElement } from '~/utils/ref/get-html-element'

export type VPictureVNodeProps = ExtractPropTypes<typeof pictureProps>
type PicturePropsKeys = keyof VPictureVNodeProps

export default defineComponent({
  props: {
    ...pictureProps,
    src: {
      // override required src on NuxtImg
      type: pictureProps.src.type,
    },
    placeholder: {
      type: [Boolean, String],
    },
  },
  setup(props) {
    const $style = useCssModule()

    // Load
    const root = ref<HTMLElement | null>(null)
    const loaded = ref(false)
    const onLoad = () => (loaded.value = true)

    onMounted(() => {
      const img = getHtmlElement(root)?.querySelector('img')
      if (img?.complete) onLoad()
    })

    // Props
    const vNodeProps: Partial<VPictureVNodeProps> = {}
    Object.keys(pictureProps).forEach((key: PicturePropsKeys | string) => {
      // @ts-ignore just copy values
      if (props[key]) vNodeProps[key] = props[key]
    })

    if (!vNodeProps.src) return () => h('')

    vNodeProps.imgAttrs = {
      ...vNodeProps.imgAttrs,
      onLoad: () => (loaded.value = true),
      style: {
        ...vNodeProps.imgAttrs?.style,
      },
    }

    console.log('picture source', vNodeProps)

    // Common attributes
    const rootStyle = computed(() => {
      if (typeof props.placeholder === 'string') return { '--v-picture-background': props.placeholder }
    })

    const rootClasses = computed(() => {
      return [$style.root, loaded.value && $style['root--loaded']]
    })

    const rootAttributes = computed(() => {
      return {
        ref: root,
        style: rootStyle.value,
        class: rootClasses.value,
      }
    })

    // Custom render for <source> tags
    const slots = useSlots()
    if (slots.default) {
      provide('pictureVNodeProps', vNodeProps)

      const img = h(NuxtImg, {
        ...vNodeProps,
        ...vNodeProps.imgAttrs,
      })

      return () =>
        h(
          'picture',
          {
            ...rootAttributes.value,
          },
          [slots.default?.(), img],
        )
    }

    // regular render
    return () =>
      h(NuxtPicture, {
        ...rootAttributes.value,
        ...vNodeProps,
      })
  },
})
</script>

<style lang="scss" module>
.root {
  position: relative;

  &::before {
    position: absolute;
    background: no-repeat var(--v-picture-background);
    background-size: cover;
    content: '';
    inset: 0;
    pointer-events: none;
    transition: opacity 0.3s;
  }

  &--loaded::before {
    opacity: 0;
  }
}
</style>
