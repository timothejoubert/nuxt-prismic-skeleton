<script setup lang="ts">
const sizes = ['s', 'm', 'l', 'xl']
</script>

<template>
    <NuxtStory>
        <VStoryThemeProvider>
            <VButton
                v-for="size in sizes"
                :key="size"
                label="Button label"
                :size="size"
                filled
                icon-name="chevron-right"
            />
        </VStoryThemeProvider>
    </NuxtStory>
</template>
