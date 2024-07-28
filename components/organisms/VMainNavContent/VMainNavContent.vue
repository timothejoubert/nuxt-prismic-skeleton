<script lang="ts" setup>
// Hydration
const { mainMenu } = useCommonContent()
const linkList = computed(() => mainMenu.value?.links || [])

const props = defineProps<{ isDisplayed: boolean }>()

const $style = useCssModule()
const rootClasses = computed(() => {
    return [$style.root, props.isDisplayed && $style['root--displayed']]
})
</script>

<template>
    <nav
        v-if="linkList.length"
        :class="rootClasses"
        aria-label="Main"
    >
        <ul :class="$style.list">
            <li
                v-for="(item, i) in linkList"
                :key="i"
                :class="$style.item"
            >
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
  width: 100%;
  pointer-events: none;
  text-transform: uppercase;
  visibility: hidden;

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
  background-color: color(primary-70);
  padding-block: rem(14);
  padding-inline: rem(30);

  &:global(.router-link-exact-active)::after,
  &:not(#{&}--home):global(.nuxt-link-active)::after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: color(primary-120);
    content: '';
  }
}
</style>
