<script lang="ts" setup>
import type { VPageProps } from '~/types/prismic'
import type { ArchivesDocumentData } from '~/prismicio-types'

const props = defineProps<VPageProps<ArchivesDocumentData>>()
// const content = props.webResponse.data.content
</script>

<template>
    <div>Archives</div>
    <div :class="$style.root">{{ webResponse.data.title }}</div>
</template>

<style lang="scss" module>
.root {
}
</style>
