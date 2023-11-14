<script setup lang="ts">
import { defaultPageTransition } from "~/transitions/default-page-transition";
import type { ProjectDocument } from "~/prismicio-types";

const { webResponse, itemData, error, title } = await useFetchPage();

if (error) showError(error);

definePageMeta({
    pageTransition: defaultPageTransition,
});

usePage({ title, webResponse });

const isProjectListing = itemData?.type === "Project listing";

const projects = ref<ProjectDocument[] | null>(null);

const prismic = usePrismic();
const route = useRoute();

if (isProjectListing) {
    const { data } = await useAsyncData(
        route.params.uid.toString(),
        async () => {
            const document = await prismic.client.getAllByType("project", {
                orderings: [
                    {
                        field: "my.project.creation",
                        direction: "desc",
                    },
                    {
                        field: "my.project.title",
                        direction: "desc",
                    },
                ],
                fetch: [
                    "project.title",
                    "project.creation",
                    "project.main_media",
                ],
                pageSize: 12,
            });

            if (document) {
                return document;
            } else {
                throw createError({
                    statusCode: 404,
                    message: "Page not found",
                });
            }
        },
    );

    projects.value = data.value;
}

console.log(projects.value);
</script>

<template>
    <div :class="$style.root">
        <VHeader v-if="itemData" :page="itemData" />
        <div v-if="isProjectListing && projects?.length">
            <div v-for="project in projects" :key="project.uid">
                <div class="text-h3">
                    {{ project.uid }}
                </div>
            </div>
        </div>
        <main>Main content</main>
    </div>
</template>

<style lang="scss" module>
.root {
    position: relative;
    overflow: auto;
    min-height: calc(100vh - var(--v-top-bar-height) - var(--v-footer-height));
}
</style>
