<script setup lang="ts">
import type { ProjectListingPageDocument } from '~/prismicio-types'
import { defaultPageTransition } from '~/transitions/default-page-transition'
import { DocumentType } from '~/constants/document-type'
import { NuxtLink } from '#components'
import { useLocale } from '~/composables/use-locale'

definePageMeta({
  pageTransition: defaultPageTransition,
  name: DocumentType.PROJECT_LISTING,
  alias: ['/en-gb/projets'],
})

const { webResponse, pageData, alternateLinks, error } = await useFetchPage<ProjectListingPageDocument>(
  DocumentType.PROJECT_LISTING,
)

if (error) {
  showError(error)
}

usePage({
  webResponse,
  alternateLinks,
  title: webResponse.data.meta_title || webResponse.data.title || webResponse.uid || '',
})

const { fetchLocaleOption } = useLocale()

const prismic = usePrismic()
const { data: listingResponse } = await useAsyncData(
  'project_listing',
  () => {
    return prismic.client.getAllByType('project_page', {
      pageSize: 30,
      orderings: [{ field: 'my.project_page.creation_date', direction: 'desc' }, { field: 'my.project_page.title' }],
      lang: fetchLocaleOption.value?.lang,
    })
  },
  { deep: false },
)

const fetchedProject = computed(() => listingResponse.value || [])

const filteredProjectList = computed(() => {
  if (!selectedTags.value.length) return fetchedProject.value

  return fetchedProject.value.filter((project) => {
    return project.tags.some((tag) => selectedTags.value.includes(tag))
  })
})

// TAG FILTER
const isFilterBarOpen = ref(false)

const tags = computed(() => {
  return fetchedProject.value.map((project) => project.tags).flat(2) || []
})

// Initial tag
const route = useRoute()
const QUERY_TAG = 'tag'
const tagQuery = route.query[QUERY_TAG]
const initialQuery = (Array.isArray(tagQuery) ? tagQuery[0] : tagQuery)?.split('&')
const selectedTags = ref(initialQuery || [])

// Setter queries
const router = useRouter()
watch(
  selectedTags,
  (tag) => {
    let parsedQuery
    if (tag.length === 1) parsedQuery = tag[0]
    else parsedQuery = tag.join('&').toString()

    router.push({ query: { tag: parsedQuery } })
  },
  { deep: true },
)
</script>

<template>
  <div :class="$style.root">
    <header :class="$style.head">
      <h1 class="text-h4">{{ pageData.title }}</h1>
      <VFilterProjectButton v-model="isFilterBarOpen" :has-tag-selected="!!selectedTags.length" />
    </header>
    <VProjectFilters v-model="selectedTags" :is-open="isFilterBarOpen" :tags="tags" />
    <main>
      <ul v-if="filteredProjectList?.length" :class="$style.list">
        <li v-for="(project, i) in filteredProjectList" :key="i">
          <VProjectCard :tag="NuxtLink" :project="project" layout="centered" :class="$style.card">
            <NuxtImg
              v-if="project.data.main_media"
              :src="project.data.main_media.url"
              width="600"
              height="390"
              provider="imgix"
              placeholder="/images/placeholder.jpg"
              :class="$style.media"
              fit="cover"
              :modifiers="{ crop: 'edges' }"
              sizes="xs:100vw sm:100vw md:50vw lg:33vw vl:33vw xl:33vw xxl:33vw hd:33vw qhd:33vw"
            />
          </VProjectCard>
        </li>
      </ul>
    </main>
  </div>
</template>

<style lang="scss" module>
.root {
  margin-inline: var(--page-gutter);
}

.head {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: rem(12);
  margin-top: rem(140);
}

.list {
  display: grid;
  margin-top: rem(12);
  grid-gap: rem(24);
  grid-template-columns: 1fr;

  @include media('>=md') {
    grid-template-columns: 1fr 1fr;
  }
}

.card {
  width: 100%;
}

.media {
  border-radius: rem(22);
  width: 100%;
}
</style>
