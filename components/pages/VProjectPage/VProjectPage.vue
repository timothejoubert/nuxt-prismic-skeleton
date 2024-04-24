<script setup lang="ts">
import type { ProjectPageDocument } from '~/prismicio-types'
import { DocumentType } from '~/constants/document-type'
import { parseProjectTags } from '~/utils/prismic/project'
import type { PageProps } from '~/types/app'
import { getDocumentRoutePath } from '~/utils/prismic/route-resolver'

const props = defineProps<PageProps<ProjectPageDocument>>()
const project = computed(() => props.prismicDocument.data)

const tags = computed(() => parseProjectTags(props.prismicDocument.tags))

const router = useRouter()
function getProjectListingPathByTag(tag: string) {
  return router.resolve({
    path: getDocumentRoutePath(DocumentType.PROJECT_LISTING),
    query: { tag: encodeURIComponent(tag).trim() },
  })
}
</script>

<template>
  <header :class="$style.header" class="container-fullscreen">
    <h1 v-if="project.title" class="text-h2" :class="$style.title">{{ project.title }}</h1>
    <VText v-if="project.excerpt" :content="project.excerpt" :class="$style.description" class="text-body-s" />
    <div v-if="tags.length" :class="$style.tags">
      <VButton
        v-for="(tag, i) in tags"
        :key="tag + '-' + i"
        :to="getProjectListingPathByTag(tag)"
        :label="tag"
        outlined
        theme="light"
        size="m"
      />
    </div>
    <VPrismicImage
      :reference="project.main_media"
      :class="$style.image"
      :img-attrs="{ loading: 'eager' }"
      width="1232"
      height="740"
    >
      <VPictureSource media="(max-width: 540px)" sizes="xs:100vw sm:100md md:100vw" width="300" height="350" />
      <VPictureSource sizes="lg:100vw xl:100vw xxl:100vw hd:100vw qhd:100vw" />
    </VPrismicImage>
    <VText
      v-if="project.description"
      :content="project.description"
      :class="$style['description-full']"
      class="text-body-s"
    />
  </header>
</template>

<style lang="scss" module>
.header {
  position: relative;
  overflow: auto;
  padding-bottom: rem(102);
  margin-top: calc(var(--v-top-bar-height) * -1);
  background-color: color(black);
  color: color(white);
  padding-inline: var(--page-gutter);
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: rem(12);
  padding-top: calc(var(--v-top-bar-height) + #{rem(100)});
}

.title {
  margin-right: rem(30);
  grid-column: 1 / -1;

  @include media('>=md') {
    grid-column: 1 / span 1;
    max-width: 20ch;
  }
}

.description {
  margin-top: rem(5);
  opacity: 0.7;
  max-width: 46ch;
  grid-column: 1 / -1;

  @include media('>=md') {
    grid-column: 2 / -1;
    max-width: 42ch;
  }
}

.tags {
  display: flex;
  flex-basis: 100%;
  gap: rem(14);
}

.image {
  margin-top: rem(24);
  position: relative;
  width: 100%;
  overflow: hidden;
  max-height: 70vh;
  border-radius: rem(30);
  grid-column: 1 / -1;
}

.description-full {
  display: inline-block;
  max-width: 50ch;
  padding-top: rem(12);
  border-top: 1px solid rgba(color(white), 0.6);
  margin-top: rem(8);
  opacity: 0.7;
}

.other-projects {
  margin-block: 25vh;
}
</style>
