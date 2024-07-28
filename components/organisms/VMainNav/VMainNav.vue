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
        <VMainNavContent
            :is-displayed="isDisplayed"
            :class="$style.nav"
        />
        <VToggleNav
            :aria-hidden="isMinMd"
            :aria-expanded="isDisplayed"
            :aria-controls="id"
            :aria-label="ariaLabel"
            :class="$style.toggle"
            @click="toggle"
        />
    </div>
</template>

<style lang="scss" module>
.root {
    position: fixed;
    z-index: 11;
    right: rem(20);
    bottom: rem(20);
    left: rem(20);

    @include media('>=md') {
        position: initial;
        right: initial;
        bottom: initial;
        width: calc(#{flex-grid-value(11, 14, '%', true)} + var(--gutter) * 2);
    }
}

.toggle {
  float: right;

  @include media('>=md') {
    display: none;
  }

}
</style>
