<script setup lang="ts">
import type { Theme } from '~/types/app'
import { NuxtLink } from '#components'

export type VButtonSize = 's' | 'm' | 'l' | 'xl'

export interface VButtonProps {
    filled?: boolean
    label?: string | false
    size?: VButtonSize | false
    elevated?: boolean
    rounded?: boolean
    outlined?: boolean
    disabled?: boolean
    tag?: string | false
    href?: string | false // external (absolute) or internal (relative) link
    to?: string | Object | boolean // internal link (use NuxtLink)
    iconLast?: boolean
    skeleton?: boolean
    theme?: Theme | false
    control?: boolean
}

defineSlots<{
    default: (props: unknown) => unknown
    icon: (props: unknown) => unknown
}>()

const props = withDefaults(defineProps<VButtonProps>(), {
    iconLast: true,
})

const emit = defineEmits<{ click: [event: Event] }>()

const slots = useSlots()

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
    } else if (typeof props.href === 'string' && isRelativePath(props.href)) {
        result.to = props.href
    } else if (props.href) {
        result.href = props.href
        if (!isAnchor(props.href)) result.target = '_blank'
    }

    return result
})

const hasIcon = computed((): boolean => {
    return !!slots.icon
})

const hasLabel = computed((): boolean => {
    return !!slots.default || !!props.label
})

const $style = useCssModule()
// const { themeClass } = useTheme({ props })

const rootClasses = computed(() => {
    return [
        $style.root,
        props.outlined && $style['root--outlined'],
        props.filled && $style['root--filled'],
        props.elevated && $style['root--elevated'],
        props.disabled && $style['root--disabled'],
        props.skeleton && $style['root--skeleton'],
        props.rounded && $style['root--rounded'],
        props.iconLast && $style['root--icon-last'],
        props.control && $style['root--control'],
        typeof props.size === 'string' && $style['root--size-' + props.size],
        hasIcon.value && $style['root--has-icon'],
        hasLabel.value && $style['root--has-label'],
        // themeClass.value && themeClass.value,
    ]
})

function onClick(event: MouseEvent) {
    emit('click', event)
}
</script>

<template>
    <component
        :is="internalTag"
        :class="rootClasses"
        :disabled="internalTag === 'button' && disabled"
        v-bind="linkProps"
        @click="onClick">
        <span v-if="hasIcon" ref="icon" :class="$style.icon">
            <slot name="icon" />
        </span>
        <span v-if="hasLabel" :class="$style.label">
            <slot>{{ label }}</slot>
        </span>
    </component>
</template>

<style lang="scss" module>
.root {
    @include v-button-default-css-vars($v-button);
    @include v-button-default-css-vars($v-button-commons);
    @include theme-variants;

    position: var(--v-button-position, relative);
    display: inline-flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;

    // border: none;
    animation: var(--hover-animation-name) 0.7s ease(out-quad);
    color: var(--theme-foreground-color);
    text-align: left;
    text-decoration: none;
    transition:
        background-color 0.3s,
        border-color 0.3s,
        color 0.3s;

    @media (prefers-reduced-motion: reduce) {
        animation: none;
        transition: none;
    }

    &--rounded {
        @include v-button-css-vars-by-size($v-button-rounded, 'm', 'rounded');
        @include v-button-default-css-vars($v-button-rounded, 'rounded');
    }

    &--outlined {
        @include v-button-default-css-vars($v-button-filled, 'filled');

        border-width: var(--v-button-border-width, 1px);
        border-style: solid;
        border-color: var(--v-button-border-color, currentColor);
    }

    &--filled {
        @include v-button-default-css-vars($v-button-filled, 'filled');

        background-color: var(--theme-background-color);
        color: var(--theme-foreground-color);
    }

    &--elevated {
        box-shadow: 0 2px 32px 0 rgba(#000, 0.1);
    }

    &--skeleton {
        // @include loading-animation;

        background-color: var(--theme-skeleton-background);
        color: transparent;
        pointer-events: none; // prevents click on disabled link (<a> or <nuxt-link>)
    }

    // DISABLED

    &--disabled {
        color: color(grey-300);
        pointer-events: none; // prevents click on disabled link (<a> or <nuxt-link>)
    }

    &--outlined#{&}--disabled {
        background-color: transparent;
    }

    &--filled#{&}--disabled {
        background-color: color(grey-100);
    }

    // SIZES
    @each $key, $value in $v-button {
        &--size-#{$key} {
            @include v-button-size($key);
        }
    }
}

.icon {
    @include v-button-default-css-vars($v-button-icon, 'icon');

    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 0;

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }

    .root--icon-last & {
        order: 2;
    }

    .root--skeleton & {
        visibility: hidden;
    }
}

.label {
    @include v-button-default-css-vars($v-button-label, 'label');

    z-index: 1;
    text-overflow: ellipsis;
    white-space: nowrap;

    .root:not(.root--has-icon) & {
        margin-inline: 0;
    }

    .root:not(.root--outlined, .root--filled) & {
        margin-inline: 0 rem(4);
    }

    .root--skeleton & {
        visibility: hidden;
    }
}
</style>
