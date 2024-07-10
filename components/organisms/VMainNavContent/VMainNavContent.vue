<script lang="ts" setup>
// Hydration
const { mainMenu } = useCommonContent()
const linkList = computed(() => mainMenu.value?.links || [])

const props = defineProps<{isDisplayed: boolean}>()

const $style = useCssModule()
const rootClasses = computed(() => {
  return [$style.root, props.isDisplayed && $style['root--displayed']]
})
</script>

<template>
  <nav v-if="linkList.length" :class="rootClasses" aria-label="Main">
    <ul :class="$style.list">
      <li v-for="(item, i) in linkList" :key="i" :class="$style.item">
        <VLink
          :reference="item.link"
          class="text-over-title-sm"
          :class="$style.link"
          :label="item.label"
        />
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" module>
.root {
  text-transform: uppercase;
  width: 100%;
  visibility: hidden;
  pointer-events: none;

    &--displayed {
      pointer-events: initial;
      visibility: initial;
    }

  @include media('>=md') {
    pointer-events: initial;
    visibility: initial;
  }
}

.list {
  display: flex;
  flex-direction: column;

  @include media('>=md') {
    flex-direction: row;
  }
}

.item {
  position: relative;
  flex: 1;
}

.link {
  display: block;
  padding-block: rem(14);
  background-color: lightgrey;
  padding-inline: rem(30);

  &:global(.router-link-exact-active)::after,
  &:not(#{&}--home):global(.nuxt-link-active)::after {
    position: absolute;
    left: 0;
    width: 100%;
    bottom: 0;
    height: 2px;
    background-color: rgba(black, 0.5);
    content: '';
  }
}
</style>
