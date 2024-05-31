import { joinURL } from 'ufo'

export function useSiteUrlPath(path: string | undefined) {
  const runtimeConfig = useRuntimeConfig()

  return path ? joinURL(runtimeConfig.public.siteUrl, path) : undefined
}
