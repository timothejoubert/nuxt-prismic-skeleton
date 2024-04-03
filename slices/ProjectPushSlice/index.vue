<script setup lang="ts">
import { type Content } from '@prismicio/client'

const props = defineProps(getSliceComponentProps<Content.ProjectPushSliceSlice>())

const projectReference = computed(() => props.slice.primary.project_reference)
const projectId = computed(() => projectReference.value?.id)

const { client } = usePrismic()
const { data: project } = await useAsyncData(projectId.value, () => client.getByID(projectId.value), { deep: false })
</script>

<template>
  <section v-if="project" class="slice-container" :class="$style.root">
    <VProjectCard :project="project" title-class="text-h4" layout="full" :class="$style.card">
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
        sizes="xs:100vw sm:100vw md:100vw lg:100vw vl:100vw xl:100vw xxl:100vw hd:100vw qhd:100vw"
      />
    </VProjectCard>
  </section>
</template>

<style lang="scss" module>
.root {
  --v-card-date-display: none;
}
.card {
  width: 100%;
}
.media {
  border-radius: rem(22);
  width: 100%;
  max-height: 90vh;
  object-fit: cover;
}
</style>
