<script setup lang="ts">
const imgFile = {
    width: 667,
    height: 1000,
    placeholder: '#473b2a',
    alt: 'Nom du fichier',
    src: '01.jpg',
    name: 'Nom du fichier',
    description: 'Description du fichier',
    copyright: "Titulaire du droit d'auteur",
    externalUrl: 'https://external-url.com',
}
</script>

<template>
    <NuxtStory>
        <NuxtStoryVariant title="Default">
            <VPicture v-bind="imgFile" provider="interventionRequest" />
            <VPicture
                v-bind="imgFile"
                :width="imgFile.width / 5"
                :height="imgFile.height / 5"
                provider="interventionRequest"
            />
        </NuxtStoryVariant>
        <NuxtStoryVariant title="With crop modifiers">
            <VPicture
                v-bind="imgFile"
                provider="interventionRequest"
                width="200"
                height="150"
                :modifiers="{ crop: '200x150' }"
            />
        </NuxtStoryVariant>
    </NuxtStory>
</template>

<style module lang="scss">
.root {
    :global(.nuxt-story__main) {
        display: flex;
        align-items: flex-start;
        gap: rem(40);
    }
}
</style>
