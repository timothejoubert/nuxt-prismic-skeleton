export type SplashScreenState = 'pending' | 'beforeEnter' | 'beforeLeaved' | 'leave' | 'done'

export function useSplashScreenState() {
  return useState<SplashScreenState>('splashScreenState', () => 'pending')
}
