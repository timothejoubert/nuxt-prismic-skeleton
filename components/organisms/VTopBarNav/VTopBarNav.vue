<script lang="ts" setup>
const { mainMenu } = useCommonContent()
const { $getPrismicUrl } = useNuxtApp()

const navItemList = computed(() => {
  const links = mainMenu.value?.links

  return (
    links
      ?.filter((group) => group?.link)
      .map((group) => {
        console.log()
        return {
          label: group.label,
          url: $getPrismicUrl(group.link),
        }
      }) || []
  )
})

console.log(navItemList.value)
</script>

<template>
  <nav v-if="navItemList?.length" :class="$style.root">
    <ul :class="$style.list">
      <li v-for="(item, i) in navItemList" :key="i">
        <NuxtLink :to="item.url" class="text-over-title-s" :class="$style.item" prefetch>
          <VSplitWord :content="item.label" />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" module>
.root {
  text-transform: uppercase;
}

.list {
  display: flex;
  gap: rem(16);
}

.item {
  position: relative;

  :global(.nuxt-link-exact-active)::after,
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
