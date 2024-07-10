<script setup lang="ts">

interface VArrowProps {
  tag: string
  size: 'sm' | 'md' | 'lg'
  direction: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(defineProps<VArrowProps>(), {
  size: 'md',
  direction: 'right',
  tag: 'span'
})

const $style = useCssModule()

const rootClasses = computed(() => {
  return [$style.root,
    $style[`root--direction-${props.direction}`],
    $style[`root--size-${props.size}`]
  ]
})
</script>

<template>
  <component aria-hidden="true" :is="tag" :class="rootClasses">
    <VIcon :class="$style.icon" name="arrow-right" />
  </component>
</template>

<style lang="scss" module>
.root {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: color(grey-400);

  &--size-sm {
    border-radius: rem(12);
    padding: rem(3);
  }

  &--size-md {
    border-radius: rem(16);
    padding: rem(6);
  }

  &--size-lg {
    border-radius: rem(30);
    padding: rem(9);
  }
}

.icon {
  transform-origin: center;
  height: auto;

  .root--size-sm & {
    @include property-fluid('width', (xs: 16, xl: 24), $breakpoint: null);
  }

  .root--size-md & {
    @include property-fluid('width', (xs: 24, xl: 38), $breakpoint: null);
  }

  .root--size-lg & {
    @include property-fluid('width', (xs: 28, xl: 60), $breakpoint: null);
  }

  .root--direction-top & {
    rotate: -90deg;
  }

  .root--direction-bottom & {
    rotate: 90deg;
  }

  .root--direction-left & {
    rotate: 180deg;
  }
}
</style>
