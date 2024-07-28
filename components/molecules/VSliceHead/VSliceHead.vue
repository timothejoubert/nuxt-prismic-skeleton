<script setup lang="ts">
import type { LinkField, ContentRelationshipField } from '@prismicio/types'
import { getLinkFieldFilled, getLinkToRelationFieldFilled } from '~/utils/prismic/prismic-link-to'

export interface VSliceHeadProps {
    title: string | null
    linkLabel?: string
    externalLinkReference?: LinkField
    internalLinkReference?: ContentRelationshipField
}

const props = defineProps<VSliceHeadProps>()

const hasLink = computed(() => {
    const filledExternalLink = getLinkFieldFilled(props.externalLinkReference)?.url
    const filledInternalLink = getLinkToRelationFieldFilled(props.internalLinkReference)?.url
    return props.linkLabel || filledExternalLink || filledInternalLink
})
</script>

<template>
    <header :class="$style.root">
        <h1
            class="text-h3"
            :class="$style.title"
        >
            {{ title }}
        </h1>

        <VLinkArrowButton
            v-if="hasLink"
            :link-label="linkLabel"
            :external-link-reference="externalLinkReference"
            :internal-link-reference="internalLinkReference"
            :class="$style.link"
        />
    </header>
</template>

<style lang="scss" module>
.root {
    @include property-fluid(padding-top, (xs: 36, xl: 60));
    @include property-fluid(padding-bottom, (xs: 26, xl: 20));

    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title {

}

.link {
  margin-right: rem(46);
}
</style>
