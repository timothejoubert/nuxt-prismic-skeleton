<script lang="ts">
import { vPrismicLinkProps } from '~/components/molecules/VPrismicLink/VPrismicLink.vue'
import { vArrowProps } from '~/components/atoms/VArrow/VArrow.vue'

export const vLinkArrowButton = {
    ...vPrismicLinkProps,
    ...vArrowProps,
}

export default defineComponent({
    props: vLinkArrowButton,
})
</script>

<template>
    <VPrismicLink
        :external-link-reference="externalLinkReference"
        :internal-link-reference="internalLinkReference"
        :class="$style.root"
    >
        <VArrow
            :tag="tag"
            :size="size"
            :direction="direction"
            :href="href"
            :class="$style.arrow"
        />
        {{ linkLabel }}
    </VPrismicLink>
</template>

<style lang="scss" module>
.root {
    display: flex;
    max-width: rem(172);
    align-items: center;
    text-transform: uppercase;

    @include text-over-title-xl;
}

.arrow {
    align-self: stretch;
    margin-right: rem(8);
}
</style>
