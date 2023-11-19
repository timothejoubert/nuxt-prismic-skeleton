<script setup lang="ts">
import { defaultPageTransition } from '~/transitions/default-page-transition'
// import { components } from "~/slices";

const { webResponse, itemData, title } = await useFetchPage()

definePageMeta({
    pageTransition: defaultPageTransition,
})

usePage({ title, webResponse })

const isProjectListing = itemData?.type === 'Project listing'
// const isArchive = itemData?.type === 'Archives'
</script>

<template>
    <div :class="$style.root">
        <VHeader v-if="itemData" :page="itemData" />
        <VProjectListing v-if="isProjectListing" />
        <div v-else>Main content</div>

        <div :class="$style.buttons">
            <VButton>label</VButton>
            <VButton filled>label</VButton>
            <VButton outlined>label</VButton>
            <VButton outlined filled theme="light">label</VButton>
            <VButton outlined filled theme="dark">label</VButton>
        </div>
        <!--  <SliceZone-->
        <!--      wrapper="main"-->
        <!--      :slices="page?.data.slices ?? []"-->
        <!--      :components="components"-->
        <!--  />-->
    </div>
</template>

<style lang="scss" module>
.root {
    position: relative;
    overflow: auto;
    min-height: var(--min-page-content-height);
}

.buttons {
    display: flex;
    gap: rem(20);
}
</style>
