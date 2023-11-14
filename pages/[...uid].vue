<script setup lang="ts">
import { defaultPageTransition } from "~/transitions/default-page-transition";

const { webResponse, itemData, error } = await useFetchPage();

if (error) showError(error);

definePageMeta({
  pageTransition: defaultPageTransition,
});

const prismic = usePrismic();
const title =
  prismic.asText(itemData?.title) || itemData?.title || webResponse?.uid;

usePage({ title, webResponse });
</script>

<template>
  <div :class="$style.root">
    Page content: <span>{{ title }}</span>
    <div v-if="webResponse">{{ webResponse.data }}</div>
  </div>
</template>

<style lang="scss" module>
.root {
}
</style>
