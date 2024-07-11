<script lang="ts">
import type {ContentRelationshipField, LinkField} from "@prismicio/types";
import {getLinkFieldFilled, getLinkToRelationFieldFilled} from "~/utils/prismic/prismic-link-to";
import {h, type PropType} from "vue";
import {VLink} from "#components";

export default defineComponent({
  inheritAttrs: false,
  props: {
    linkLabel: String,
    externalLinkReference: Object as PropType<LinkField>,
    internalLinkReference: Object as PropType<ContentRelationshipField>,
  },
  setup(props, { slots }) {
    const filledExternalLink = getLinkFieldFilled(props.externalLinkReference)?.url
    const filledInternalLink = getLinkToRelationFieldFilled(props.internalLinkReference)?.url

    // TODO: Slot content mismatch
    return () =>
        h(VLink, { url: filledExternalLink || filledInternalLink, label: props.linkLabel }, slots.default)
  },
})
</script>
