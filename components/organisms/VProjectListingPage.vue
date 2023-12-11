<script setup lang="ts">
import type { ProjectListingDocumentData } from '~/prismicio-types'
import type { VPageProps } from '~/types/prismic'

const props = defineProps<VPageProps<ProjectListingDocumentData>>()
const pageData = computed(() => props.webResponse.data)

const prismic = usePrismic()

const { data: projects } = await useAsyncData('projects', async () => {
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

const projectLayout = ref<'grid' | 'row'>('grid')
</script>

<template>
    <div :class="$style.root" class="grid">
        <VHeaderTitle v-if="pageData.title" class="text-h1 grid-page-content" :content="pageData.title" />
        <div :class="$style.filter" class="grid-aside-content">
            <div :class="$style.layout">
                <div :class="$style.layout__title">Layout</div>
                <button :class="$style.layout__button">Grid</button>
                <button :class="$style.layout__button">Row</button>
            </div>
            <div :class="$style.tags">
                <div :class="$style.tags__title">Filtres</div>
                <button v-for="tag in tags" :key="tag" :class="$style.tags__button">{{ tag }}</button>
            </div>
        </div>
        <template v-if="projects?.length">
            <VProjectCard
                v-for="project in projects"
                :key="project.uid"
                class="grid-page-content"
                :prismic-project="project"
                layout="condensed" />
        </template>
    </div>
</template>

<style lang="scss" module>
.root {
}

.filter {
    position: sticky;
    top: var(--v-top-bar-height);
    grid-row: 2;
    align-self: flex-start;
}

.layout {
    display: flex;
    align-items: center;
}

.layout__title {
    padding-inline: rem(20);
}

.layout__button {
    flex-basis: 40%;
}

.tags {
    display: flex;
    flex-direction: column;
}

.layout > *,
.tags > * {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: rem(24);
    outline: 1px solid color(dark);
}
</style>
