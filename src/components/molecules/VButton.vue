<template>
    <component
        :is="internalTag"
        :class="classNames"
        :disabled="internalTag === 'button' && disabled"
        v-bind="linkProps"
        @click="onClick"
    >
        <span ref="inner" :class="$style.inner">
            <span v-if="hasIcon" ref="icon" :class="[$style.icon, animation && 'v-button__icon']">
                <slot name="icon" />
            </span>
            <span v-if="hasLabel" :class="$style.label">
                <slot>{{ label }}</slot>
            </span>
        </span>
    </component>
</template>

<script lang="ts">
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import type { PropType } from 'vue'
import { Theme } from '~/types/app'

export type VButtonSize = 'xs' | 's' | 'm' | 'l' | 'xl'

function isRelativePath(path: string): boolean {
    return path.charAt(0) === '/'
}

function isAnchor(path: string): boolean {
    return path.charAt(0) === '#'
}

export default Vue.extend({
    name: 'VButton',
    props: {
        filled: Boolean,
        label: [String, Boolean, Object] as PropType<string | false | VueI18n.TranslateResult>,
        size: [String, Boolean] as PropType<VButtonSize | false>,
        elevated: Boolean,
        rounded: {
            type: Boolean,
            default: true,
        },
        outlined: Boolean,
        disabled: Boolean,
        tag: [String, Boolean] as PropType<string | false>,
        href: [String, Boolean] as PropType<string | false>, // external (absolute) or internal (relative) link
        to: [String, Object, Boolean], // internal link (use NuxtLink)
        iconLast: {
            type: Boolean,
            default: true,
        },
        theme: { type: String as PropType<Theme>, default: 'dark' },
        animation: { type: Boolean, default: true },
        playAnimation: Boolean,
    },
    computed: {
        classNames(): (string | boolean | undefined)[] {
            return [
                this.$style.root,
                this.$style[`root--theme-${this.theme}`],
                typeof this.size === 'string' && this.$style['root--size-' + this.size],
                this.outlined && this.$style['root--outlined'],
                this.filled && this.$style['root--filled'],
                this.elevated && this.$style['root--elevated'],
                this.disabled && this.$style['root--disabled'],
                this.rounded && this.$style['root--rounded'],
                this.hasIcon && this.$style['root--has-icon'],
                this.hasLabel && this.$style['root--has-label'],
                this.iconLast && this.$style['root--icon-last'],
                this.animation && 'v-button--enable-animation',
                this.playAnimation && this.$style['root--animate'],
            ]
        },
        internalTag(): string {
            if (typeof this.tag === 'string') return this.tag

            if (this.to || (typeof this.href === 'string' && isRelativePath(this.href))) return 'nuxt-link'
            else if (this.href) return 'a'
            else return 'button'
        },
        hasIcon(): boolean {
            return !!this.$slots.icon || !!this.$scopedSlots.icon
        },
        hasLabel(): boolean {
            return !!this.$slots.default || !!this.$scopedSlots.default || !!this.label
        },
        linkProps(): Record<string, any> {
            const props: Record<string, any> = {}
            const localePath = this.$getLocalePath()

            if (this.to) {
                props.to = localePath + this.to
            } else if (typeof this.href === 'string' && isRelativePath(this.href)) {
                props.to = localePath + this.href
            } else if (this.href) {
                props.href = localePath + this.href
                if (!isAnchor(this.href)) props.target = '_blank'
            }

            return props
        },
    },
    methods: {
        onClick(event: MouseEvent) {
            this.$emit('click', event)
        },
    },
})
</script>

<style lang="scss" module>
@use 'sass:math';

.root {
    @include v-button-default-css-vars($v-button);
    @include theme-variants;

    display: inline-block;
    overflow: hidden;
    border: none;
    color: var(--theme-foreground-color, color(black));
    text-decoration: none;
    transition: background-color 0.3s, border-color 0.3s, color 0.3s;

    &--enabled-animation {
        overflow: hidden;
    }

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }

    &--rounded {
        @include v-button-default-css-vars($v-button-rounded, 'rounded');

        border-radius: rem(40);
    }

    &--outlined {
        border-color: var(--v-button-border-color, currentColor);
    }

    &--filled {
        background-color: var(--theme-background-color);
        color: var(--theme-foreground-color);
    }

    &--disabled {
        color: color(grey-50);
        pointer-events: none; // prevents click on disabled link (<a> or <nuxt-link>)
    }

    &--outlined#{&}--disabled {
        background-color: transparent;
    }

    &--filled#{&}--disabled {
        background-color: color(grey-50);
    }

    // HOVER

    @media (hover: hover) {
        &--outlined:not(#{&}--disabled):hover {
            border-color: var(--theme-button-outlined-hover-background);
            background-color: var(--theme-button-outlined-hover-background);
            color: var(--theme-button-outlined-hover-color);
        }

        &--filled#{&}--animate:not(#{&}--disabled),
        &--filled:not(#{&}--disabled):hover {
            background-color: var(--theme-button-filled-hover-background);
            color: var(--theme-button-filled-hover-foreground);
        }
    }

    // SIZES

    @each $key, $value in $v-button {
        &--size-#{$key} {
            @include v-button-size($key);
        }
    }
}

.inner {
    @include v-button-default-css-vars($v-button-inner, 'inner');

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
    transition: all 0.3s;

    .root:not(.root--outlined):not(.root--filled) & {
        padding: 0;
    }

    .root--has-icon:not(.root--has-label) & {
        padding: 0;
    }

    .root--outlined & {
        border-width: var(--v-button-border-width, 1px);
        border-style: solid;
        border-color: inherit;
        border-radius: inherit;
    }
}

.icon {
    @include v-button-default-css-vars($v-button-icon, 'icon');

    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--v-button-icon-color, currentColor);
    line-height: 0;

    @media (prefers-reduced-motion: reduce) {
        transition: none;
    }

    .root--icon-last & {
        order: 2;
    }

    .root--has-icon:not(.root--has-label) & {
        margin: 0;
    }
}

.label {
    @include v-button-default-css-vars($v-button-label, 'label');

    padding: var(--v-button-label-padding-top, #{rem(2)}) var(--v-button-label-padding-right, #{rem(4)})
        var(--v-button-label-padding-bottom, #{rem(2)}) var(--v-button-label-padding-left, #{rem(4)});
    white-space: nowrap;
}
</style>
