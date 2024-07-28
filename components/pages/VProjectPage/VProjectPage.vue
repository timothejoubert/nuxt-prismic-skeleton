<script setup lang="ts">
import type { ProjectPageDocument } from '~/prismicio-types'
import type { PageProps } from '~/types/app'

const props = defineProps<PageProps<ProjectPageDocument>>()
const project = computed(() => props.prismicDocument.data)
</script>

<template>
    <div>Project page</div>
</template>

<style lang="scss" module></style>
