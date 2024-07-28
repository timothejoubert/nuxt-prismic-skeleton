<script lang="ts">
import { h, type PropType } from 'vue'
import type { NuxtLinkProps } from '#app/components/nuxt-link'
import { NuxtLink } from '#components'
import type { ReachableDocument } from '~/types/api'

export const vLinkProps = {
    label: [String, Boolean],
    reference: [Array, Object] as PropType<ReachableDocument[] | ReachableDocument>,
    url: String,
    document: Object,
    nuxtLinkProps: Object as PropType<NuxtLinkProps>,
    custom: Boolean, // use scoped slot
}

export default defineComponent({
    inheritAttrs: false,
    props: vLinkProps,
    setup(props, { attrs, slots }) {
        const reference = props.reference && Array.isArray(props.reference) ? props.reference[0] : props.reference
        const url = props.url || reference?.url
        const { $isInternalUrl } = useNuxtApp()

        const isInternal = $isInternalUrl && $isInternalUrl(url || '')
        const isExternal = !isInternal && !!props.url
        const isDownload = !isInternal && !isExternal && !!props.document

        // A VLink without URL or reference will render nothing except the default slot if present, fallback to the label, or at least nothing
        if (!url && !props.document?.relativePath) {
            return () =>
                slots.default?.({ label: props.label })
                || (typeof props.label === 'string' && h('span', attrs, props.label))
                || null
        }

        // Define attributes
        const attributes = { ...attrs, ...props.nuxtLinkProps }

        if (isDownload || isExternal) {
            Object.assign(attributes, {
                target: attrs?.target || '_blank',
                rel: attrs?.rel || 'noopener',
            })
        }

        if (isDownload) {
            console.log('download document isn\'t done')
            // Object.assign(attributes, { href: useDocumentUrl(props.document?.relativePath) })
        }
        else if (isInternal) {
            Object.assign(attributes, { to: url })
        }
        else if (isExternal) {
            Object.assign(attributes, { href: props.url })
        }

        // Custom VLink will pass all attributes to the default slot and render it (i.e. render-less component behavior)
        if (props.custom) {
            const vNode = slots.default?.({
                download: isDownload ? '' : undefined,
                ...attributes,
            })

            if (vNode?.length) return () => vNode[0]
        }

        // By default return a NuxtLink component
        return () =>
            h(NuxtLink, attributes, slots.default || (() => (typeof props.label === 'string' && props.label) || ''))
    },
})
</script>
