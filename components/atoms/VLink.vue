<script lang="ts">
import type { TranslateResult } from 'vue-i18n'
import { h as createElement } from 'vue'
import type { ConcreteComponent } from 'vue'
import { NuxtLink } from '#components'

export interface VLinkNuxtLinksProps {
    exactPath: boolean
}

export interface VLinkProps {
    label?: string | boolean
    url?: string
    custom?: boolean
    nuxtLinkProps?: VLinkNuxtLinksProps
}

function getDefaultLabel(label: string): TranslateResult | false {
    const { t } = useI18n()

    // TODO: The translation exist function 'te(label)' seems to not work
    return t(label)
}

export default {
    inheritAttrs: false,
    props: {
        label: {
            type: [String, Boolean],
            default: undefined,
        },
        url: String,
        custom: Boolean, // use scoped slot
        nuxtLinkProps: Object as PropType<VLinkNuxtLinksProps>,
    },
    setup(props: VLinkProps, { attrs, slots }) {
        const isRelative = props.url?.charAt(0) === '/'
        const isInternal = (isRelative || props.url?.charAt(0) === '#') && !attrs.target
        const isExternal = !isInternal && !!props.url
        const isDownload = !isInternal && !isExternal // TODO: check if document

        const internalUrl = isInternal && props.url
        let label: string | TranslateResult | undefined | boolean = props.label

        if (!props.url)
            return () => slots.default?.({ label }) || (label && createElement('span', label)) || createElement('')

        if (!label && label !== false) label = getDefaultLabel('link.external_default_label') || props.url

        function getAttributes() {
            const result = { ...attrs }

            if (isDownload) {
                Object.assign(result, {
                    href: internalUrl,
                    target: '_blank',
                    rel: 'noopener',
                })
            } else if (isInternal) {
                Object.assign(result, {
                    ...props.nuxtLinkProps,
                    to: internalUrl,
                })
            } else if (isExternal) {
                Object.assign(result, {
                    href: props.url,
                    target: attrs?.target || '_blank',
                    rel: !isRelative && 'noopener',
                })
            }

            return result
        }

        if (props.custom) {
            const vNode = slots.default?.({
                label,
                href: attrs.href || getAttributes().href || props.url,
                target: attrs.target,
                rel: attrs.rel,
                class: attrs.class,
                to: internalUrl,
            })

            if (vNode?.length) return () => vNode[0]
        }

        if (!(attrs!.href || getAttributes().href) && !internalUrl) {
            return () => slots.default?.() || (label ? createElement('span', String(label)) : createElement(''))
        }

        function render() {
            const fallbackChild = () => (label && String(label)) || ''
            const tag = NuxtLink as ConcreteComponent

            return createElement(tag, getAttributes(), slots.default || fallbackChild)
        }

        return () => render()
    },
}
</script>
