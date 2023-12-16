<script setup lang="ts">
import type { ProjectListingDocumentData } from '~/prismicio-types'
import type { VPageProps } from '~/types/prismic'

const props = defineProps<VPageProps<ProjectListingDocumentData>>()
const pageData = computed(() => props.webResponse.data)

const prismic = usePrismic()

const { data: projects } = await useAsyncData('projects', () => {
    return prismic.client.getAllByType('project', {
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
})

// useAllPrismicDocumentsByTag()
const { data: tags } = await useAsyncData('tags', () => {
    return prismic.client.getTags()
})

const projectLayout = ref<'grid' | 'row'>('grid')

const $style = useCssModule()
const rootClasses = computed(() => {
    return [$style.root, projectLayout.value === 'row' && $style['root--layout-row']]
})
</script>

<template>
    <div :class="rootClasses" class="grid">
        <VHeaderTitle
            v-if="pageData.title"
            :class="$style.title"
            class="text-h1 grid-page-content"
            :content="pageData.title" />
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
        <div v-if="projects?.length" :class="$style.projects" class="grid-page-content">
            <VProjectCard
                v-for="project in projects"
                :key="project.uid"
                :class="$style.card"
                :prismic-project="project"
                layout="condensed" />
        </div>
    </div>
</template>

<style lang="scss" module>
.root {
    padding-bottom: rem(200);
    grid-auto-flow: dense;

    &::before {
        position: relative;
        background-color: red;
        content: '';
        grid-column: -3 / -1;
        grid-row: 1;
    }
}

.title {
    position: relative;
}

.filter {
    position: sticky;
    top: var(--v-top-bar-height);
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
    min-height: rem(24);
    align-items: center;
    justify-content: center;
    outline: 1px solid color(dark);
}

.projects {
    display: grid;
    gap: rem(20) var(--gutter);
    grid-template-columns: repeat(2, 1fr);
    margin-block: rem(82) rem(300);
}

.card {
    align-self: flex-start;

    //grid-column: span 2;
}
</style>
