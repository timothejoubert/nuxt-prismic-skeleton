<script setup lang="ts">
const sizes = ['s', 'm', 'l', 'xl']
</script>

<template>
    <NuxtStory>
        <NuxtStoryVariant title="Primary with props">
            <VButton
                v-for="size in sizes"
                :key="size"
                label="Button label"
                :size="size"
                emphasis="primary"
                icon-name="chevron-right"
            />
            <div data-backspace></div>
            <VButton
                v-for="size in sizes"
                :key="size"
                label="Button label"
                :size="size"
                emphasis="primary"
                icon-name="chevron-right"
                disabled
            />
        </NuxtStoryVariant>
        <NuxtStoryVariant title="Secondary with props">
            <VButton
                v-for="size in sizes"
                :key="size"
                label="Button label"
                :size="size"
                emphasis="secondary"
                icon-name="chevron-right"
            />
            <div data-backspace></div>
            <VButton
                v-for="size in sizes"
                :key="size"
                label="Button label"
                :size="size"
                emphasis="secondary"
                icon-name="chevron-right"
                disabled
            />
        </NuxtStoryVariant>
        <NuxtStoryVariant title="ternary with props">
            <VButton
                v-for="size in sizes"
                :key="size"
                label="Button label"
                :size="size"
                emphasis="ternary"
                icon-name="chevron-right"
            />
            <div data-backspace></div>
            <VButton
                v-for="size in sizes"
                :key="size"
                label="Button label"
                :size="size"
                emphasis="ternary"
                icon-name="chevron-right"
                disabled
            />
        </NuxtStoryVariant>
    </NuxtStory>
</template>
