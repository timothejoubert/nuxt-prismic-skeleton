interface UsePlashScreenOptions {
  onLeave?: () => void
}

export function useSplashScreen(options?: UsePlashScreenOptions) {
  const state = useSplashScreenState()

  const isSplashScreenRunning = computed(() => state.value !== 'done')
  const isSplashScreenDone = computed(() => state.value === 'done')

  watch(state, (value) => {
    if (value === 'leave' && options?.onLeave) options?.onLeave()
  })

  return { isSplashScreenRunning, isSplashScreenDone }
}
