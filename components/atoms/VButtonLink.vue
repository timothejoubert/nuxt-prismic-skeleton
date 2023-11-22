<script lang="ts" setup>
import type { VButtonProps } from '~/components/atoms/VButton.vue'
import type { Theme } from '~/types/app'
import type { VLinkProps } from '~/components/atoms/VLink.vue'

interface VCtaProps extends VLinkProps {
    emphasis?: Theme
}

const props = defineProps<VCtaProps>()

const buttonProps: VButtonProps = {}
if (props.emphasis === 'main' || !props.emphasis) {
    Object.assign(buttonProps, { filled: true })
} else if (props.emphasis === 'secondary') {
    Object.assign(buttonProps, { outlined: true })
}

const linkProps = Object.fromEntries(Object.entries(props).filter(([key]) => !key.includes('emphasis')))
const theme = props.emphasis ? props.emphasis : 'main'
</script>

<template>
    <VLink v-slot="scopedLinkProps" v-bind="linkProps" custom>
        <VButton v-bind="{ ...scopedLinkProps, ...buttonProps }" :theme="theme">
            <template #icon>
                <slot><VAppSymbol /></slot>
            </template>
        </VButton>
    </VLink>
</template>
