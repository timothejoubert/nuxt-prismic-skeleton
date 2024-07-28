<script setup lang="ts">
const sizes = ['s', 'm', 'l', 'xl']
</script>

<template>
    <NuxtStory>
        <VStoryThemeProvider>
            <VButton
                v-for="size in sizes"
                :key="size"
                :size="size"
                theme="light"
                filled
                icon-name="chevron-right"
            />
        </VStoryThemeProvider>
        <VStoryThemeProvider>
            <VButton
                v-for="size in sizes"
                :key="size"
                :size="size"
                theme="dark"
                filled
                icon-name="chevron-right"
            />
        </VStoryThemeProvider>
        <VStoryThemeProvider>
            <VButton
                v-for="size in sizes"
                :key="size"
                :size="size"
                filled
                icon-name="search"
            />
        </VStoryThemeProvider>
        <VStoryThemeProvider>
            <VButton
                v-for="size in sizes"
                :key="size"
                :size="size"
                outlined
                icon-name="search"
            />
        </VStoryThemeProvider>
    </NuxtStory>
</template>
