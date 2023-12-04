<script lang="ts" setup>
import type { VPageProps } from '~/types/prismic'
import type { HomePageDocumentData } from '~/prismicio-types'

const props = defineProps<VPageProps<HomePageDocumentData>>()
const data = computed(() => props.webResponse.data)
</script>

<template>
    <div :class="$style.root">
        <VHeaderTitle v-if="data.title" class="text-h1" :class="$style.title" :content="data.title" />
        <!--        <div v-if="data.title" class="text-h1" :class="$style.title">-->
        <!--            <VSplitWords v-if="data.title" :content="data.title" />-->
        <!--        </div>-->
    </div>
</template>

<style lang="scss" module>
.root {
}
.title {
    position: relative;
}
</style>
