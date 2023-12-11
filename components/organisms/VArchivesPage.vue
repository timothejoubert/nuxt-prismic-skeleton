<script lang="ts" setup>
import type { VPageProps } from '~/types/prismic'
import type { ArchivesDocumentData } from '~/prismicio-types'

const props = defineProps<VPageProps<ArchivesDocumentData>>()
const data = computed(() => props.webResponse.data)
</script>

<template>
    <div :class="$style.root" class="grid">
        <VHeaderTitle v-if="data.title" class="text-h1 grid-page-content" :content="data.title" />
    </div>
</template>

<style lang="scss" module>
.root {
}
</style>
