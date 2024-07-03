<script lang="ts" setup>
const { mainMenu } = useCommonContent()
const linkList = computed(() => mainMenu.value?.links || [])

const { t } = useI18n()
const id = 'v-main-nav' // useId()

// NAV STATE
const isDisplayed = ref(false)
const nav = ref<HTMLElement | null>(null)

// Update on css media query
const { width } = useWindowSize()
const isMinMd = computed(() => width.value > getBreakpointValue('md'))
watch(isMinMd, (value) => {
  console.log('isMinMd', value, nav.value)
  if (value) {
    isDisplayed.value = true
    nav.value?.hidePopover()
  } else {
    isDisplayed.value = !!nav.value?.matches(':popover-open')
  }
})

// Update on popover state
function onNavToggle(event: ToggleEvent) {
  isDisplayed.value = event.newState === 'open'
}

onMounted(() => {
  isDisplayed.value = isMinMd.value
  nav.value?.addEventListener('toggle', onNavToggle)
})
onBeforeUnmount(() => {
  nav.value?.removeEventListener('toggle', onNavToggle)
})

// Accessibility
const ariaLabel = computed(() => t(isDisplayed.value ? 'toggle_menu.close' : 'toggle_menu.open'))
</script>

<template>
  <VToggleNav
    :popovertarget="id"
    :aria-expanded="isDisplayed"
    :aria-controls="id"
    :aria-label="ariaLabel"
    :class="$style.toggle"
  />
  <nav v-if="linkList.length" :id="id" ref="nav" popover :class="$style.root" aria-label="Main">
    <ul :class="$style.list">
      <li v-for="(item, i) in linkList" :key="i">
        <VLink
          :reference="item.link"
          class="text-over-title-sm"
          :class="$style.item"
          :label="item.label"
          :nuxt-link-props="{ prefetch: true }"
        />
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" module>
.toggle {
  @include media('>=md') {
    display: none;
  }
}

.root {
  text-transform: uppercase;
  width: 100%;

  &::backdrop {
    background-color: rgb(0 0 0 / 0);
    transition:
      display 0.7s allow-discrete,
      overlay 0.7s allow-discrete,
      background-color 0.7s;
  }

  &:popover-open::backdrop {
    background-color: rgb(0 0 0 / 0.25);
  }

  @include media('>=md') {
    & {
      display: block;
      position: relative;
    }
  }
}

@starting-style {
  .root:popover-open::backdrop {
    background-color: rgb(0 0 0 / 0);
  }
}

.list {
  display: flex;
  flex-direction: column;
  gap: rem(16);

  @include media('>=md') {
    flex-direction: row;
  }
}

.item {
  position: relative;

  &:global(.router-link-exact-active)::after,
  &:not(#{&}--home):global(.nuxt-link-active)::after {
    position: absolute;
    right: 0;
    bottom: rem(-2);
    left: 0;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.1);
    content: '';
  }
}
</style>
