<script lang="ts" setup>
import { joinURL } from 'ufo'

interface JsonLdbBreadcrumbItem {
  '@id': string
  name: string
  image?: string
}

interface JsonLdbBreadcrumb {
  '@type': string
  position: number
  item: JsonLdbBreadcrumbItem
}

const { mainMenu, siteName } = useCommonContent()
// TODO: find why CommonContent fetch isn't working

const navItemList = computed(() => {
  const links = mainMenu.value?.links

  return links?.filter((menuLink) => menuLink?.link) || []
})

const breadcrumbJsonldB = computed((): Record<string, unknown> | undefined => {
  if (navItemList.value?.length < 2) return

  const itemFulledList = navItemList.value.filter((item) => item.link?.uid)

  const items = itemFulledList.map((item, index) => {
    const result: JsonLdbBreadcrumb = {
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': joinURL(siteName.value, item.link.uid),
        name: item.label || 'Page label',
      },
    }
    const image = item.link.data?.meta_image?.url || item.link.data?.thumbnail?.url
    if (image) result.item.image = image

    return result
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
})

function isHomePath(documentUid: string | undefined) {
  return !documentUid || documentUid === 'accueil'
}

const i18n = useI18n()
const basePath = computed(() => (i18n.locale.value === 'en' ? '/en' : ''))

function parseLinkUrl(uid: string | undefined) {
  if (isHomePath(uid)) {
    return basePath.value
  } else {
    return basePath.value + '/' + uid
  }
}
</script>

<template>
  <nav :class="$style.root">
    <NuxtLink
      v-for="(item, i) in navItemList"
      :key="i"
      :to="parseLinkUrl(item.link.uid)"
      class="text-over-title-s"
      :class="[$style.item, isHomePath(item.link.uid) && $style['item--home']]"
      prefetch
      :aria-current="$route.fullPath === parseLinkUrl(item.link.uid) ? 'page' : false"
    >
      <span>{{ item.label }}</span>
      <!--      <v-split-word :word="item.label" />-->
    </NuxtLink>
    <!--    <script v-if="breadcrumbJsonldB" type="application/ld+json" v-html="breadcrumbJsonldB"></script>-->
  </nav>
</template>

<style lang="scss" module>
.root {
  position: relative;
  display: flex;
  gap: rem(16);
  text-transform: uppercase;
}

.item {
  position: relative;

  &--home:global(.nuxt-link-exact-active)::after,
  &:not(#{&}--home):global(.nuxt-link-active)::after {
    position: absolute;
    right: 0;
    bottom: rem(-2);
    left: 0;
    height: 1px;
    background-color: color(black);
    content: '';
  }
}
</style>
