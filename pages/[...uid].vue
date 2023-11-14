<script setup lang="ts">
import { defaultPageTransition } from "~/transitions/default-page-transition";

const { webResponse, itemData, error, title } = await useFetchPage();

if (error) showError(error);

definePageMeta({
    pageTransition: defaultPageTransition,
});

usePage({ title, webResponse });
</script>

<template>
    <div>
        <VHeader :page="itemData" />
        <main>Main content</main>
    </div>
</template>

<style lang="scss" module>
.root {
    position: relative;
}
</style>
