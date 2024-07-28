export default {
    sizes: String,
    alt: String,
    copyright: String,
    imgixParams: {
        type: Object,
        default: undefined,
        validator: (val: string) => {
            return [
                'ar',
                'auto',
                'bgRemove',
                'bgRemoveFallback',
                'bg',
                'blendAlign',
                'blendalign',
                'ba',
                'blendAlpha',
                'bf',
                'blur',
                'bri',
                'con',
                'cornerRadius',
                'crop',
                'exp',
                'fit',
                'flip',
                'h',
            ].includes(val)
        },
    },
    widths: {
        type: [String, Array] as unknown as () => number[] | 'thumbnails' | 'defaults',
        default: undefined,
        validator: (val: unknown) => {
            return Array.isArray(val)
                ? val.every(v => typeof v === 'number')
                : typeof val === 'string' && ['thumbnails', 'defaults'].includes(val)
        },
    },
}

// const props = defineProps(vRawPictureProps)
