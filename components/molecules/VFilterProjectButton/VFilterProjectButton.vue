<script setup lang="ts">
interface VFilterProjectButtonProps {
  hasTagSelected: boolean
}
const isOpen = defineModel<boolean>()

defineProps<VFilterProjectButtonProps>()
</script>

<template>
  <VButton
    :class="[$style.toggle, hasTagSelected && $style['toggle--active'], isOpen && $style['toggle--open']]"
    :animation="false"
    :label="$t('filter.label') || 'filter.label'"
    @click="isOpen = !isOpen"
  >
    <template #icon>
      <div :class="$style['toggle-icon']"></div>
    </template>
  </VButton>
</template>

<style lang="scss" module>
.toggle {
  ---v-button-icon-margin: #{rem(8)} 0 #{rem(8)} #{rem(8)};
  --v-button-padding-inline: 0;

  position: relative;

  &::before {
    position: absolute;
    top: rem(10);
    left: rem(-6);
    width: rem(6);
    height: rem(6);
    background-color: color(black);
    border-radius: 100vmax;
    content: '';
    scale: 0;
    transition: scale 0.3s;
  }

  &--active::before {
    scale: 1;
  }
}

.toggle-icon {
  position: relative;
  display: flex;
  width: rem(24);
  height: rem(24);
  align-items: center;
  justify-content: center;
  transform-origin: center;
  transition: rotate 0.4s ease(out-quad);

  &::before,
  &::after {
    position: absolute;
    background-color: color(black);
    content: '';
  }

  &::before {
    width: 1px;
    height: rem(14);
  }

  &::after {
    width: rem(14);
    height: 1px;
    margin-top: -1px;
  }

  .toggle--open & {
    rotate: 135deg;
  }
}
</style>
