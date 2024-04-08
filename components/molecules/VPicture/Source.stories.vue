<script setup lang="ts"></script>

<template>
    <NuxtStory>
        <NuxtStoryVariant title="InterventionRequest">
            <VPicture
                src="01.jpg"
                provider="interventionRequest"
                placeholder="#5e6363"
                width="800"
                height="400"
            >
                <VPictureSource width="400" height="600" :modifiers="{ crop: '400x600' }" media="(max-width: 1024px)" />
                <VPictureSource :modifiers="{ crop: '800x400' }" />
            </VPicture>
        </NuxtStoryVariant>
        <NuxtStoryVariant title="IPX">
            <VPicture src="images/share.jpg" placeholder="lightgrey" width="800" height="400">
                <VPictureSource
                    width="400"
                    height="600"
                    :modifiers="{ resize: '400x600' }"
                    media="(max-width: 1024px)"
                />
                <VPictureSource :modifiers="{ resize: '800x400' }" />
            </VPicture>
        </NuxtStoryVariant>
    </NuxtStory>
</template>

<style module lang="scss">
.image-wrapper {
    max-width: rem(600);
}
</style>
