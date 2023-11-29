<script lang="ts" setup>
import type { VPageProps } from '~/types/prismic'
import type { HomePageDocumentData } from '~/prismicio-types'

const props = defineProps<VPageProps<HomePageDocumentData>>()
// const content = props.webResponse.data.content
</script>

<template>
    <div :class="$style.root">{{ webResponse.data.title }}</div>
</template>

<style lang="scss" module>
.root {
}
</style>
