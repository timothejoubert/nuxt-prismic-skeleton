<script setup lang="ts">
import type { TranslateResult } from 'vue-i18n'
import { NuxtLink } from '#components'
import type { Theme } from '~/types/app'

export type VButtonSize = 'xs' | 's' | 'm' | 'l' | 'xl'
export type VButtonStyle = 'primary' | 'secondary' | 'ternary'
export type Variant = 'menu' | 'anchor'

export interface VButtonProps {
  filled?: boolean
  loading?: boolean
  iconName?: string
  label?: string | false | TranslateResult
  size?: VButtonSize | false
  rounded?: boolean
  outlined?: boolean
  disabled?: boolean
  tag?: string | false
  href?: string | false // external (absolute) or internal (relative) link
  to?: string | Object | boolean // internal link (use NuxtLink)
  iconLast?: boolean
  variant?: Variant
  theme?: Theme | false
  animation?: boolean
  playAnimation?: boolean
}

const props = withDefaults(defineProps<VButtonProps>(), {
  iconLast: true,
  rounded: true,
  animation: true,
})

function isRelativePath(path: string): boolean {
  return path.charAt(0) === '/'
}

function isAnchor(path: string): boolean {
  return path.charAt(0) === '#'
}

const internalTag = computed((): string | typeof NuxtLink => {
  if (typeof props.tag === 'string') return props.tag

  if (props.to || (typeof props.href === 'string' && isRelativePath(props.href))) return NuxtLink
  else if (props.href) return 'a'
  else return 'button'
})

const linkProps = computed((): Record<string, any> => {
  const result: Record<string, any> = {}

  if (props.to) {
    result.to = props.to
  } else if (typeof props.href === 'string' && isRelativePath(props.href) && props.tag !== 'a') {
    result.to = props.href
  } else if (props.href) {
    result.href = props.href
    if (!isAnchor(props.href) && !isRelativePath(props.href)) result.target = '_blank'
  }

  return result
})

// slots
const slots = defineSlots<{
  default: (props: unknown) => unknown
  icon: (props: unknown) => unknown
}>()
const hasIconSlot = computed(() => !!slots.icon)
const hasIcon = computed(() => hasIconSlot.value || !!props.iconName)
const hasLabel = computed(() => !!slots.default || !!props.label)

const { themeClass } = useTheme({ props })

const $style = useCssModule()
const rootClasses = computed(() => {
  return [
    $style.root,
    props.outlined && $style['root--outlined'],
    props.filled && $style['root--filled'],
    props.disabled && $style['root--disabled'],
    props.rounded && $style['root--rounded'],
    props.iconLast && $style['root--icon-last'],
    hasIcon.value && $style['root--has-icon'],
    hasLabel.value && $style['root--has-label'],
    props.loading && $style['root--loading'],
    !!props.size && $style[`root--size-${props.size}`],
    !!props.variant && $style['root--variant-' + props.variant],
    themeClass.value,
    // Custom anim
    props.animation && $style['root--animation-enabled'],
    props.playAnimation && $style['root--animate'],
  ]
})
</script>

<template>
  <component
    :is="internalTag"
    :class="rootClasses"
    :disabled="(internalTag === 'button' && disabled) || undefined"
    v-bind="linkProps"
  >
    <VLoadingDots v-if="hasIcon && loading" :class="$style.icon" />
    <VIcon v-else-if="iconName" :name="iconName" :class="$style.icon" />
    <slot v-else-if="hasIconSlot" name="icon" :icon-class="$style.icon" />

    <span v-if="hasLabel" :class="$style.label">
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>

<style lang="scss" module>
.root {
  @include v-button-default-css-vars($v-button);
  @include theme-variants;

  position: var(--v-button-position, relative);
  display: var(--v-button-display, inline-flex);
  align-items: center;
  justify-content: var(--v-button-justify-content, center);
  backface-visibility: hidden;
  color: var(--v-button-color, var(--theme-foreground-color));
  text-transform: var(--v-button-text-transform, none);
  transition:
    background-color 0.3s,
    scale 0.4s,
    border-color 0.3s,
    color 0.3s;

  &--animation-enabled {
    overflow: hidden;
  }

  @media (hover: hover) {
    &:active {
      scale: 0.98;
    }

    &--outlined:not(#{&}--disabled):hover {
      background-color: var(--theme-foreground-color);
      color: var(--theme-background-color);
    }

    &--filled#{&}--animate:not(#{&}--disabled),
    &--filled:not(#{&}--disabled):hover {
      background-color: var(--theme-foreground-color);
      color: var(--theme-background-color);
    }
  }

  &--icon-last {
    flex-direction: row-reverse;
  }

  // BUTTON PROPS STYLES
  &--rounded {
    @include v-button-default-css-vars($v-button-rounded, 'rounded');
  }

  &--outlined {
    @include v-button-default-css-vars($v-button-outlined, 'outlined');
  }

  &--filled {
    @include v-button-default-css-vars($v-button-filled, 'filled');
  }

  &--disabled {
    //@include v-button-default-css-vars($v-button-disabled, 'disabled');

    // prevents click on disabled link (<a> or <nuxt-link>)
    pointer-events: none;
    user-select: none;
  }

  // LOADING
  &--loading {
    cursor: wait;
    pointer-events: none; // prevents click on disabled link (<a> or <nuxt-link>)
  }

  @each $key, $value in $v-button {
    &--size-#{$key} {
      @include v-button-size($key);
    }
  }
}

// can't apply class to icon slot directly
// be aware than all nested svg are styled
//svg,
.icon {
  @include v-button-default-css-vars($v-button-icon, 'icon');

  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--v-button-icon-color, currentColor);
  line-height: 0;
  flex-shrink: 0;

  .root--loading & {
    visibility: hidden;
  }

  .root--tertiary:not(.root--has-label) & {
    padding: 0;
    margin: 0;
  }

  .root--animation-enabled & {
    background-color: red !important;
  }

  @media (hover: hover) {
    .root--animate &,
    .root--animation-enabled:hover & {
      animation:
        slideOut 0.2s,
        slideIn 0.4s 0.2s ease(out-quart);

      @media (prefers-reduced-motion: reduce) {
        animation: none;
      }
    }
  }
}

.label {
  @include v-button-default-css-vars($v-button-label, 'label');

  position: relative;
  z-index: 1;
  display: var(--v-button-label-display);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  .root--loading & {
    visibility: hidden;
  }

  &:only-child {
    --v-button-label-padding-inline: 0;
  }
}

@keyframes slideOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-15px);
  }
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
