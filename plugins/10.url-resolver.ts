import { joinURL } from 'ufo'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  const siteUrl = runtimeConfig.public.siteUrl || ''
  const route = useRoute()

  const canonicalUrl = computed(() => joinURL(siteUrl, route.path))

  function isInternalUrl(url: string | undefined) {
    return url?.charAt(0) === '/' || url?.charAt(0) === '#' || url?.startsWith(siteUrl)
  }

  function isExternalUrl(url: string | undefined, siteUrl?: string) {
    return !isInternalUrl(url) && !(siteUrl && url?.startsWith(siteUrl))
  }

  return {
    provide: {
      joinSiteUrl: (...path: string[]) => joinURL(siteUrl, ...path),
      isInternalUrl: (url: string | undefined) => isInternalUrl(url),
      isExternalUrl: (url: string | undefined) => isExternalUrl(url, siteUrl),
      canonicalUrl,
    },
  }
})
