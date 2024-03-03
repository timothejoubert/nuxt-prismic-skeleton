<script setup lang="ts">
import type { TranslateResult } from 'vue-i18n'
import { NuxtLink } from '#components'
import type { Theme } from '~/types/app'

export type VButtonSize = 's' | 'm' | 'l' | 'xl'
export type VButtonStyle = 'primary' | 'secondary' | 'ternary'
export type Variant = 'menu' | 'anchor'

export interface VButtonProps {
  filled?: boolean
  loading?: boolean
  iconName?: string
  label?: string | false | TranslateResult
  size?: VButtonSize | false
  elevated?: boolean
  rounded?: boolean
  outlined?: boolean
  disabled?: boolean
  tag?: string | false
  href?: string | false // external (absolute) or internal (relative) link
  to?: string | Object | boolean // internal link (use NuxtLink)
  iconLast?: boolean
  variant?: Variant
  emphasis?: VButtonStyle
  theme?: Theme | false
}

const props = withDefaults(defineProps<VButtonProps>(), {
  iconLast: true,
  rounded: true,
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

// Emphasis changes
const isFilled = computed(() => {
  return props.emphasis !== 'ternary' && (props.filled || props.emphasis === 'primary')
})

const isOutlined = computed(() => {
  return props.outlined || props.emphasis === 'secondary'
})

// slots
const slots = defineSlots<{
  default: (props: unknown) => unknown
  icon: (props: unknown) => unknown
}>()
const hasIconSlot = computed(() => !!slots.icon)
const hasIcon = computed(() => hasIconSlot.value || !!props.iconName)
const hasLabel = computed(() => !!slots.default || !!props.label)

// const { themeClass } = useTheme({ props })

const $style = useCssModule()
const rootClasses = computed(() => {
  return [
    $style.root,
    isOutlined.value && $style['root--outlined'],
    isFilled.value && $style['root--filled'],
    props.elevated && $style['root--elevated'],
    props.disabled && $style['root--disabled'],
    props.rounded && $style['root--rounded'],
    props.iconLast && $style['root--icon-last'],
    hasIcon.value && $style['root--has-icon'],
    hasLabel.value && $style['root--has-label'],
    props.loading && $style['root--loading'],
    !!props.emphasis && $style[`root--emphasis-${props.emphasis}`],
    typeof props.size === 'string' && $style[`root--size-${props.size}`],
    $style['root--variant-' + (props.variant || 'unset')],
    // themeClass.value,
  ]
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function onClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <component
    :is="internalTag"
    :class="rootClasses"
    :disabled="(internalTag === 'button' && disabled) || undefined"
    v-bind="linkProps"
    @click="onClick"
  >
    <VLoadingDots v-if="hasIcon && loading" ref="icon" :class="$style.icon" />
    <VIcon v-else-if="iconName" :name="iconName" :class="$style.icon" />
    <slot v-else-if="hasIconSlot" ref="icon" name="icon" :class="$style.icon" />

    <span v-if="hasLabel" :class="$style.label">
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>

<style lang="scss" module>
.root {
  @include v-button-default-css-vars($v-button, '', 'm');
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

  @media (hover: hover) {
    &:active {
      scale: 0.98;
    }
  }

  &--rounded {
    @include v-button-default-css-vars($v-button-rounded, 'rounded');
  }

  &--icon-last {
    flex-direction: row-reverse;
  }

  &--outlined {
    @include v-button-default-css-vars($v-button-outlined, 'outlined');
  }

  &--filled {
    @include v-button-default-css-vars($v-button-filled, 'filled');

    --v-button-disabled-filled-background-color: #e3e3e3;
  }

  &--elevated {
    box-shadow: 0 2px 32px 0 rgba(#000, 0.1);
  }

  // DISABLED
  &--disabled {
    @include v-button-default-css-vars($v-button-disabled, 'disabled');

    // prevents click on disabled link (<a> or <nuxt-link>)
    // cursor property can't be styled with pointer-events: none
    pointer-events: none;
    user-select: none;
  }

  // Loading
  &--loading {
    cursor: wait;
    pointer-events: none; // prevents click on disabled link (<a> or <nuxt-link>)
  }

  // VARIANTS
  //&--variant-menu {
  //    @include v-button-css-vars-by-size($v-button-menu-rounded, 's', 'rounded');
  //    @include v-button-default-css-vars($v-button-menu);
  //
  //    @each $key, $value in $v-button-menu {
  //        &--size-#{$key} {
  //            @include v-button-size($key, menu);
  //        }
  //    }
  //}
  //
  //&--variant-anchor {
  //    @include v-button-default-css-vars($v-button-anchor);
  //
  //    @each $key, $value in $v-button-anchor {
  //        &--size-#{$key} {
  //            @include v-button-size($key, anchor);
  //        }
  //    }
  //}

  // When prop size is explicitly set
  @each $key, $value in $v-button {
    &--size-#{$key} {
      @include v-button-size($key);
    }
  }
}

// can't apply class to icon slot directly
// be aware than all nested svg are styled
svg,
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
}
</style>
