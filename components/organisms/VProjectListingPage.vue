<script lang="ts" setup>
import type { ProjectDocument, ProjectListingDocumentData } from '~/prismicio-types'
import type { VPageProps } from '~/types/prismic'

defineProps<VPageProps<ProjectListingDocumentData>>()

const prismic = usePrismic()
const route = useRoute()

const projects = ref<ProjectDocument[] | null>(null)

const { data } = await useAsyncData(route.params.uid.toString(), async () => {
    const document = await prismic.client.getAllByType('project', {
        orderings: [
            {
                field: 'my.project.creation',
                direction: 'desc',
            },
            {
                field: 'my.project.title',
                direction: 'desc',
            },
        ],
        fetch: ['project.title', 'project.main_media', 'project.creation'],
        pageSize: 12,
    })

    if (document) {
        return document
    } else {
        throw createError({
            statusCode: 404,
            message: 'Error during fetch all projects',
        })
    }
})
projects.value = data.value

// useAllPrismicDocumentsByTag()
const { data: tagData } = await useAsyncData('tags', async () => {
    const tags = await prismic.client.getTags()

    // TODO: check if tag are used in project
    // ForEach tag try to fetch one project with this tag if no response remove this tag
    // tags.filter(async (tag) => {
    //     const filteredProject = await prismic.client.getByTag(tag, { fetch: '', pageSize: 1 });
    //     console.log(tag, filteredProject)
    //     return filteredProject
    // })

    if (!tags) return null

    return tags
})

const tags = tagData.value
</script>

<template>
    <div v-if="projects?.length" :class="$style.root">
        <div :class="$style.filter">
            Tags: <button v-for="tag in tags" :key="tag">{{ tag }}</button>
        </div>
        <VProjectCard v-for="project in projects" :key="project.uid" :prismic-project="project" layout="condensed" />
    </div>
</template>

<style lang="scss" module>
.root {
    --v-project-listing-columns: 1;

    position: relative;
    display: grid;
    grid-template-columns: repeat(var(--v-project-listing-columns), 1fr);

    @include media('>=md') {
        --v-project-listing-columns: 2;
    }

    @include media('>=vl') {
        --v-project-listing-columns: 3;
    }

    @include media('>=hd') {
        --v-project-listing-columns: 4;
    }
}
</style>

<style lang="scss" module>
.filter {
    display: flex;
}
</style>
