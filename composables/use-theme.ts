import { inject } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { Theme } from '~/types/app'
import { THEME_PROVIDER_KEY } from '~/composables/use-theme-provider'

export interface ThemeProps {
    theme?: Theme | false | null
}

export interface ThemeOptions {
    props?: ThemeProps
    preferredTheme?: MaybeRefOrGetter<Theme | false | null>
}

export function useTheme(options?: ThemeOptions) {
    const injectedTheme = inject(THEME_PROVIDER_KEY, null)
    const $style = useCssModule()

    const activeTheme = computed(() => {
        return toValue(options?.preferredTheme) || options?.props?.theme || injectedTheme?.value || 'dark'
    })

    const themeClass = computed(() => {
        return activeTheme.value && !!$style && $style['root--theme-' + activeTheme.value]
    })

    return { activeTheme, themeClass }
}
