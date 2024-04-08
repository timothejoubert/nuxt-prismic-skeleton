<script setup lang="ts">
import type { ProjectListingPageDocument } from '~/prismicio-types'
import { defaultPageTransition } from '~/transitions/default-page-transition'
import { DocumentType } from '~/constants/document-type'
import { parseProjectTags } from '~/utils/prismic/project'
// import {} from 'ufo'
// import { encodeUrlParams } from '~/utils/url'

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

const { data: listingResponse } = await usePrismicProjectDocuments()

const fetchedProject = computed(() => {
  if (!listingResponse.value?.length) return []

  return listingResponse.value
})

const filteredProjectList = computed(() => {
  if (!selectedTags.value.length) return fetchedProject.value

  return fetchedProject.value.filter((project) => {
    const tags = parseProjectTags(project.tags)
    return tags.some((tag) => selectedTags.value.includes(tag))
  })
})

// TAG FILTER
const isFilterBarOpen = ref(false)

const tags = computed(() => {
  return new Set(fetchedProject.value.map((project) => parseProjectTags(project.tags)).flat(2) || [])
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
    // TODO: remove query key if no value
    let parsedQuery
    if (tag.length === 1) parsedQuery = tag[0]
    else parsedQuery = tag.join('&').toString()
    // TODO: encode query with ufo module

    router.push({ query: { tag: parsedQuery } })
  },
  { deep: true },
)

function resetFilters() {
  selectedTags.value = []
}
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
          <VProjectCard :project="project" layout="centered" :class="$style.card">
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
      <div v-else :class="$style.unavailable">
        <div>Oups, aucun projet trouvé...</div>
        <VButton :label="$t('reset_filters')" outlined @click="resetFilters" />
      </div>
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

.unavailable {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: rem(30);
  border: 1px solid #e7e7e7;
  border-radius: 20px;
  min-height: rem(400);
}
</style>
