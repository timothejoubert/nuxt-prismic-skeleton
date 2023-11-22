<script lang="ts" setup>
import { type Content } from '@prismicio/client'
import { getPrismicLinkFieldProps } from '~/utils/prismic/link'

const props = defineProps<{ item: Content.ProjectListingSlice }>()

const linkProps = {
    ...getPrismicLinkFieldProps(props.item.primary.link),
    label: props.item.primary.link_label,
}
</script>

<template>
    <section :id="item.id" :data-slice-type="item.slice_type" class="slice">
        <div>{{ item.primary.title }}</div>
        <div>{{ item.primary.excerpt }}</div>
        <VButtonLink v-bind="linkProps" />
        <slot />
    </section>
</template>
