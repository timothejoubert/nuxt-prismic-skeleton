<script setup lang="ts">
const imgFile = {
    width: '2400',
    height: '1600',
    placeholder: '#5e6363',
    alt: '01.jpg',
    name: 'Image name',
    description: 'Image description',
    src: '/stories/images/01.jpg',
}
</script>

<template>
    <NuxtStory :class="$style.root">
        <VPicture v-bind="imgFile" placeholder="lightblue" provider="ipx" />
        <VPicture v-bind="imgFile" provider="ipx" :modifiers="{ resize: '400x400' }" width="400" height="400" />
        <VPicture v-bind="imgFile" provider="ipx" placeholder="red" />
    </NuxtStory>
</template>

<style module lang="scss">
.root {
    :global(.nuxt-story__main) {
        display: flex;
        flex-direction: column;
        gap: rem(40);
    }
}
</style>
