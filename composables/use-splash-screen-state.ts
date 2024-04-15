import toBoolean from '~/utils/to-boolean'

export type SplashScreenState = 'pending' | 'beforeEnter' | 'beforeLeaved' | 'leave' | 'done'

export function useSplashScreenState() {
  return useState<SplashScreenState>('splashScreenState', () => {
    return toBoolean(process.env?.DEV_DEBUG) ? 'done' : 'pending'
  })
}
