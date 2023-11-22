<script setup lang="ts">
import { type Content } from '@prismicio/client'

const props = defineProps(getSliceComponentProps<Content.ProjectListingSlice>(['slice', 'index', 'slices', 'context']))
const item = props.slice
</script>

<template>
    <VSlice :item="item">
        <div>This is inner slice</div>
    </VSlice>
</template>
