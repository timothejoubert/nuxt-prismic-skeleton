export function useSetPreferReduceMotion() {
    const preferReduceMotion = usePrefersReducedMotion()
    let mediaQuery: MediaQueryList | null = null

    const setPreferReduceMotion = () => (preferReduceMotion.value = !!mediaQuery?.matches)

    onMounted(() => {
        mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPreferReduceMotion()

        mediaQuery.addEventListener('change', setPreferReduceMotion)
    })

    onUnmounted(() => mediaQuery?.removeEventListener('change', setPreferReduceMotion))
}
