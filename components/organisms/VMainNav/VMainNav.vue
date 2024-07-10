<script lang="ts" setup>
const isDisplayed = ref(false)
const id = 'v-main-nav' // useId()

// Update on css media query
const { width } = useWindowSize()
const isMinMd = computed(() => width.value > getBreakpointValue('md'))

const toggle = () => (isDisplayed.value = !isDisplayed.value)

watch(isMinMd, (value) => {
  isDisplayed.value = value
})

onMounted(() => {
  isDisplayed.value = isMinMd.value
})
onBeforeUnmount(() => {})


const { t } = useI18n()
const ariaLabel = computed(() => t(isDisplayed.value ? 'toggle_menu.close' : 'toggle_menu.open'))
</script>

<template>
  <div :class="$style.root">
    <VMainNavContent :isDisplayed="isDisplayed" :class="$style.nav"/>
    <VToggleNav
        :aria-hidden="isMinMd"
        :aria-expanded="isDisplayed"
        :aria-controls="id"
        :aria-label="ariaLabel"
        @click="toggle"
        :class="$style.toggle"
    />
  </div>
</template>

<style lang="scss" module>
.root {
  position: fixed;
  bottom: rem(20);
  right: rem(20);

  @include media('>=md') {
    position: initial;
    bottom: initial;
    right: initial;
  }
}

.toggle {
  float: right;

  @include media('>=md') {
    display: none;
  }

}
</style>
