<script setup lang="ts">
import type { ProjectListingPageDocument } from '~/prismicio-types'
import { defaultPageTransition } from '~/transitions/default-page-transition'
import { DocumentType } from '~/constants/document-type'
import { getCardProjectProps } from '~/utils/prismic/project'
import { NuxtLink } from '#components'

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

console.log(webResponse.value)

usePage({
  webResponse: webResponse.value,
  alternateLinks: alternateLinks.value,
  title: webResponse.value.data.meta_title || webResponse.value.data.title || webResponse.value.uid || '',
})

console.log(webResponse.value.data.meta_title || webResponse.value.data.title || webResponse.value.uid || '')

const prismic = usePrismic()
const listingResponse = await useAsyncData('project_listing', () => {
  return prismic.client.getAllByType('project_page')
})

const { getLocalizedUrl } = useLocale()

const projectCardPropList = computed(() => {
  return listingResponse.data.value?.map((project) => {
    return {
      ...getCardProjectProps(project),
      url: getLocalizedUrl(`/projets/${project.uid}`),
    }
  })
})

const tags = computed(() => {
  return listingResponse.data.value?.map((project) => project.tags).flat(2) || []
})

const isOpen = ref(false)
const selectedTags = ref([])
</script>

<template>
  <div :class="$style.root">
    <header :class="$style.head">
      <h1 class="text-h4">{{ pageData.title }}</h1>
      <VFilterProjectButton v-model="isOpen" :has-tag-selected="!!selectedTags.length" />
    </header>
    <VProjectFilters v-model="selectedTags" :is-open="isOpen" :tags="tags" />
    <main>
      <ul v-if="projectCardPropList?.length" :class="$style.list">
        <li v-for="projectProps in projectCardPropList" :key="projectProps.id">
          <VCard
            :tag="NuxtLink"
            :to="projectProps.url"
            :image="projectProps.image"
            :title="projectProps.title"
            :tags="projectProps.tags"
            :date="projectProps.date"
            layout="centered"
          >
            <NuxtImg
              v-if="projectProps.image"
              :src="projectProps.image.url"
              width="600"
              height="390"
              provider="ipx"
              :class="$style.media"
              :modifiers="{ width: 600, height: 390 }"
              sizes="xs:100vw sm:100vw md:50vw lg:33vw vl:33vw xl:33vw xxl:33vw hd:33vw qhd:33vw"
            />
          </VCard>
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
  grid-gap: rem(40);
  grid-template-columns: 1fr;

  @include media('>=md') {
    grid-template-columns: 1fr 1fr;
  }
}

.media {
  border-radius: rem(22);
}
</style>
