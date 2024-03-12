<script lang="ts" setup>
import { joinURL } from 'ufo'

interface Lang {
  lang: string
  langCondensed?: string
  id?: string
  type?: string
  uid?: string
}

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const currentPageData = useCurrentPage()
const { alternateLinks } = useAlternateLinks()

const currentPageLang = computed(() => currentPageData.value.webResponse?.lang || '')
const availableLocales = computed(() => alternateLinks.value?.map((l) => formatAlternateLink(l)) || [])
const currentLang = computed(() => {
  return formatAlternateLink({ lang: currentPageLang.value })
})

function formatAlternateLink(locale: Lang) {
  const langCondensed = locale.lang?.split('-')?.[0] || locale.lang

  const url = joinURL(runtimeConfig.public.siteUrl, locale.lang, route.path.replace(currentPageLang.value, ''))

  return { ...locale, langCondensed, url }
}
</script>

<template>
  <div :class="$style.root">
    <template v-if="availableLocales.length">
      <div :class="[$style.link, $style['link--current']]" class="text-over-title-s">
        <span>{{ currentLang.langCondensed }} </span>
        <VIcon name="chevron-down" />
      </div>
      <div :class="$style.list">
        <a
          v-for="(locale, i) in availableLocales"
          :key="locale.lang + i"
          :href="locale.url"
          :hreflang="locale.lang"
          :class="$style.link"
          class="text-over-title-s"
        >
          {{ locale.langCondensed }}
        </a>
      </div>
    </template>
  </div>
</template>

<style lang="scss" module>
.root {
  position: relative;
  display: flex;
  min-width: rem(60);
  flex-direction: column;
}

.list {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: translateY(50%);
  transition: transform 0.3s ease(out-quad);
  transition-property: transform, opacity;

  @media (hover: hover) {
    .root:hover & {
      opacity: 1;
      transform: translateY(100%);
    }
  }
}

.link {
  padding: rem(6) 0 rem(6) rem(14);
  border-radius: rem(10);
  text-transform: uppercase;

  &--current {
    display: flex;
    align-items: center;
    gap: rem(2);
  }

  &--fallback {
    display: flex;
    width: rem(75);
    min-height: rem(36);
    align-items: center;
  }
}
</style>
