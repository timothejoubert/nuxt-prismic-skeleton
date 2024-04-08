<script lang="ts">
import { h, type PropType } from 'vue'
import type { NuxtLinkProps } from '#app/components/nuxt-link'
import type { LinkField, PrismicDocument } from '@prismicio/types'
import { NuxtLink } from '#components'
import { getLinkFieldFilled } from '~/utils/prismic/prismic-link-to'
import { isDocumentEntity } from '~/utils/prismic/guard'

export type Reference = PrismicDocument | LinkField

export const vLinkProps = {
  label: [String, Boolean],
  reference: Object as PropType<Reference>,
  url: String,
  isDownload: Boolean,
  nuxtLinkProps: Object as PropType<NuxtLinkProps>,
  custom: Boolean, // use scoped slot
}

export default defineComponent({
  inheritAttrs: false,
  props: vLinkProps,
  setup(props, { attrs, slots }) {
    let referenceUrl = ''

    if (isDocumentEntity(props.reference)) {
      const { $getPrismicUrl } = useNuxtApp()
      referenceUrl = $getPrismicUrl(props.reference)
    } else if (getLinkFieldFilled(props.reference)) {
      referenceUrl = props.reference?.url
    }

    console.log()

    const url = props.url || referenceUrl
    const runtimeConfig = useRuntimeConfig()
    const siteUrl = runtimeConfig?.public?.siteUrl || ''

    const isInternal = url?.charAt(0) === '/' || url?.charAt(0) === '#' || url?.startsWith(siteUrl)
    const isExternal = !isInternal && !!url

    if (!url && !props.isDownload) {
      return () =>
        slots.default?.({ label: props.label }) ||
        (typeof props.label === 'string' && h('span', attrs, props.label)) ||
        null
    }

    const linkKey = isInternal ? 'to' : isExternal || props.isDownload ? 'href' : ''
    const attributes = {
      ...attrs,
      ...props.nuxtLinkProps,
      [linkKey]: url,
    }

    if (props.isDownload || isExternal) {
      Object.assign(attributes, {
        target: attrs?.target || '_blank',
        rel: attrs?.rel || 'noopener',
      })
    }

    // Custom VLink will pass all attributes to the default slot and render it (i.e. render-less component behavior)
    if (props.custom) {
      const vNode = slots.default?.({
        download: props.isDownload ? true : undefined,
        ...attributes,
      })

      if (vNode?.length) return () => vNode[0]
    }

    return () =>
      h(NuxtLink, attributes, slots.default || (() => (typeof props.label === 'string' && props.label) || ''))
  },
})
</script>
