<script setup lang="ts">
import type { PageProps } from '~/types/app'
import type { AboutPageDocument } from '~/prismicio-types'

const props = defineProps<PageProps<AboutPageDocument>>()
const pageData = computed(() => props.prismicDocument.data)
</script>

<template>
    <div>About page</div>
</template>

<style lang="scss" module></style>
