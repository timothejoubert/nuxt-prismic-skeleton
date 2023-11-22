<script lang="ts">
import type { PropType } from 'vue'
import nuxtImageProps from '~/utils/image/nuxt-image-props'
import { NuxtPicture } from '#components'
// import { NuxtImg, NuxtPicture } from '#components'

type CopyrightPlacement = 'top' | 'right' | 'bottom' | 'left' | 'auto' | 'auto-start' | 'auto-end'

export default defineComponent({
    props: {
        ...nuxtImageProps,
        src: String,
        copyright: [String, Boolean],
        copyrightPlacement: String as PropType<CopyrightPlacement>,
        tag: { type: String, default: 'picture' },
        ratio: { type: [Boolean, Number], default: true },
        placeholder: { type: [String, Boolean], default: true },
        loading: { type: String as PropType<'lazy' | 'eager'>, default: 'lazy' },
        crop: String,
        imageAverageColor: String,
    },
    setup(props) {
        const loaded = ref(false)
        const src = props.src

        if (!src) return h('')

        const extension = src.split('.').pop()
        const isSvg = extension?.slice(0, 3) === 'svg'
        const alt = props.alt
        const copyright = props.copyright

        let width = 0
        if (typeof props.width !== 'undefined')
            width = props.width === 'string' ? parseFloat(props.width) : (props.width as number)
        else if (props.crop) width = parseFloat(props.crop.split('x')[0])

        let height = 0
        if (props.height) height = typeof props.height === 'string' ? parseFloat(props.height) : props.height
        else if (props.crop) height = parseFloat(props.crop.split('x')[1])

        // image
        // const modifiersKeys = Object.keys(interventionRequestProps).filter((key) => !['width', 'height'].includes(key))
        // const imgModifiers = { ...(props.modifiers || {}) }
        // modifiersKeys.forEach((key) => {
        //     if (typeof props[key as keyof typeof props] !== 'undefined')
        //         imgModifiers[key] = props[key as keyof typeof props]
        // })

        const imgProps: Record<string, any> = {
            ...props,
            src: src || props.src,
            alt: alt || props.alt,
            width: (!props.ratio && width) || '',
            height: (!props.ratio && height) || '',
        }
        const slots = useSlots()

        const defaultSlot = slots.default?.()
        const imgTag = defaultSlot || props.tag === 'img' || NuxtPicture // !processable ? NuxtImg : NuxtPicture
        const imgEl = ref<HTMLImageElement>()
        const img = h(imgTag, {
            ...imgProps,
            provider: imgProps.provider || 'interventionRequest',
            onLoad: () => {
                loaded.value = true
            },
        })
        const picture = defaultSlot && h('picture', [defaultSlot, img])
        const $style = useCssModule()

        onMounted(() => {
            if (imgEl.value?.complete) loaded.value = true
        })

        if (props.ratio || copyright || props.placeholder) {
            const figureStyle: Record<string, unknown> = {}
            const children: VNode[] = [picture || img]

            if (props.ratio) {
                if (typeof props.ratio === 'number') {
                    figureStyle.aspectRatio = props.ratio
                } else if (width && height) {
                    figureStyle.aspectRatio = width / height
                }
            }

            if (props.placeholder) {
                let background

                if (typeof props.placeholder === 'string') {
                    background = props.placeholder
                } else if (props?.imageAverageColor) {
                    background = props?.imageAverageColor
                }

                if (background) figureStyle.background = background
            }

            return () =>
                h(
                    'figure',
                    {
                        style: figureStyle,
                        class: [
                            $style.root,
                            props.ratio && $style['root--ratio'],
                            props.fit === 'cover' && $style['root--cover'],
                            props.loading === 'lazy' && $style['root--lazy'],
                            loaded.value && $style['root--loaded'],
                        ],
                    },
                    children,
                )
        }

        return () => picture || img
    },
})
</script>

<style lang="scss" module>
.root {
    z-index: var(--v-image-z-index, 1); // create stacking context for preventing crop glitch on Safari
    display: var(--v-image-display, inline-block);
    overflow: var(--v-image-overflow, hidden);
    border-radius: var(--v-media-border-radius, var(--v-image-border-radius, #{rem(4)}));
    background-color: var(--v-media-background-color, var(--v-image-background-color));
    transition: var(--v-image-transition, none);
    width: var(--v-image-root-width);
    height: var(--v-image-root-height);

    &--ratio {
        position: relative;
        display: var(--v-image-display, block);
    }

    &--cover {
        --v-image-root-width: 100%;
        --v-image-root-height: 100%;
        --v-image-width: 100%;
        --v-image-height: 100%;
        --v-image-object-fit: cover;
    }

    &--placeholder {
        background-repeat: no-repeat;
        background-size: cover;
    }
}

// targets direct <img /> child or <picture /> nested <img />
.root img {
    display: block;
    width: var(--v-image-width, auto);
    max-width: var(--v-image-max-width, 100%);
    height: var(--v-image-height, auto);
    min-height: var(--v-image-min-height, initial);
    aspect-ratio: var(--v-image-aspect-ratio, initial);
    object-fit: var(--v-image-object-fit, initial);
    object-position: var(--v-image-object-position, 50% 50%);
}

.root--ratio img {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--v-image-width, 100%);
    height: var(--v-image-height, 100%);
    object-fit: var(--v-image-object-fit, cover);
}

.root--lazy img {
    opacity: 0;
    transition: var(--v-image-img-transition, opacity 0.3s);
}

.root--loaded img {
    opacity: 1;
}

.copyright {
    position: absolute;
    right: var(--v-image-copyright-right, rem(22));
    bottom: var(--v-image-copyright-bottom, rem(16));
}
</style>
