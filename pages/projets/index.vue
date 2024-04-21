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
  const tags = fetchedProject.value.map((project) => parseProjectTags(project.tags)).flat(2) || []
  return [...new Set(tags)]
})

// Initial tag
const route = useRoute()
const QUERY_TAG = 'tag'

function getDefaultTagQuery() {
  const rawTagQuery = route.query[QUERY_TAG]
  const tagQuery = (Array.isArray(rawTagQuery) ? rawTagQuery[0] : rawTagQuery) || ''
  const queries = decodeURIComponent(tagQuery).split?.('&')

  if (!queries?.length || queries.every((q) => !q)) return []
  return queries
}
const selectedTags = ref(getDefaultTagQuery())

// Setter queries
const router = useRouter()
watch(
  selectedTags,
  (tag) => {
    // TODO: remove query key if no value
    let parsedQuery
    if (!tag.length) {
      router.push({ query: {} })
      return
    } else if (tag.length === 1) parsedQuery = tag[0]
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
        <li v-for="project in filteredProjectList" :key="project.uid">
          <VProjectCard :project="project" layout="centered" :class="$style.card">
            <VPrismicImage
              :reference="project.data.main_media"
              width="600"
              height="390"
              :class="$style.media"
              sizes="xs:100vw sm:100vw md:50vw lg:50vw vl:50vw xl:50vw xxl:50vw hd:50vw qhd:50vw"
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
