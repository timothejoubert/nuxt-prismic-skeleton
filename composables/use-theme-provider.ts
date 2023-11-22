import { provide } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import { useTheme } from '~/composables/use-theme'
import type { ThemeOptions } from '~/composables/use-theme'
import type { Theme } from '~/types/app'

export const THEME_PROVIDER_KEY: InjectionKey<ComputedRef<Theme>> = Symbol('themeProviderKey')

export function useThemeProvider(options?: ThemeOptions) {
    const { activeTheme, themeClass } = useTheme(options)

    const providedTheme = computed(() => {
        return activeTheme.value
    })

    provide(THEME_PROVIDER_KEY, providedTheme)

    return { providedTheme, activeTheme, themeClass }
}
