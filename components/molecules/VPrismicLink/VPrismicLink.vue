<script lang="ts">
import type { ContentRelationshipField, LinkField } from '@prismicio/types'
import { createTextVNode, h, type PropType } from 'vue'
import { getLinkFieldFilled, getLinkToRelationFieldFilled } from '~/utils/prismic/prismic-link-to'
import { VLink } from '#components'

export const vPrismicLinkProps = {
    linkLabel: String,
    externalLinkReference: Object as PropType<LinkField>,
    internalLinkReference: Object as PropType<ContentRelationshipField>,
}

export default defineComponent({
    inheritAttrs: false,
    props: vPrismicLinkProps,
    setup(props, { slots, attrs }) {
        const filledExternalLink = getLinkFieldFilled(props.externalLinkReference)?.url
        const filledInternalLink = getLinkToRelationFieldFilled(props.internalLinkReference)?.url

        return () =>
            h(VLink,
                { url: filledExternalLink || filledInternalLink || '', ...attrs },
                [slots.default?.() || createTextVNode(props.linkLabel)],
            )
    },
})
</script>
