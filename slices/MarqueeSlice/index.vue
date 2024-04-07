<script lang="ts" setup>
import { type Content } from '@prismicio/client'
import type { FilledLinkToMediaField } from '@prismicio/types'

const props = defineProps(getSliceComponentProps<Content.MarqueeSliceSlice>(['slice', 'index', 'slices', 'context']))

const medias = computed(() => props.slice.items || [])
const mediaListRow = computed(() => {
  const filteredMedias = medias.value
    .filter((item) => item.media?.url)
    .map((item) => item.media as FilledLinkToMediaField)

  if (!filteredMedias.length) return []

  return filteredMedias.reduce((acc: FilledLinkToMediaField[][], curr: FilledLinkToMediaField, index) => {
    if (index % 6 === 0) {
      acc.push([curr])
    } else {
      acc[acc.length - 1].push(curr)
    }

    return acc
  }, [])
})

const hasMedia = computed(() => !!mediaListRow.value?.[0])
</script>

<template>
  <section v-if="hasMedia" :class="$style.root">
    <LazyVMarquee
      v-for="(row, i) in mediaListRow"
      :id="`row-${i}-${row[0].id}`"
      :key="i + row[0].url"
      :space="18"
      :class="$style.marquee"
      :speed="40000"
      :reverse="!!(i % 2)"
    >
      <NuxtImg
        v-for="(media, mediaIndex) in row"
        :key="mediaIndex + media.url"
        :src="media.url"
        width="600"
        height="390"
        provider="imgix"
        placeholder="/images/placeholder.jpg"
        :class="$style.media"
        fit="cover"
        :modifiers="{ crop: 'edges' }"
        sizes="xs:40vw sm:40vw md:40vw lg:20vw vl:20vw xl:20vw hd:20vw"
      />
    </LazyVMarquee>
  </section>
</template>

<style lang="scss" module>
.root {
  overflow-x: hidden;
  margin-block: rem(320);
}

.marquee {
  display: flex;
  min-width: 100vw;
  margin-block: rem(18);
}

.media {
  border-radius: rem(6);
  width: rem(300);
  flex-shrink: 0;
  margin-right: rem(50);
  max-width: initial;
}
</style>
