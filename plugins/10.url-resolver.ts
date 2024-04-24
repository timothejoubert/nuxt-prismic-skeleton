import { joinURL } from 'ufo'
import type { RouteLocationRaw } from 'vue-router'

function isInternalUrl(url: string | undefined) {
  return url?.charAt(0) === '/' || url?.charAt(0) === '#'
}

function isExternalUrl(url: string | undefined, siteUrl?: string) {
  return !isInternalUrl(url) && !(siteUrl && url?.startsWith(siteUrl))
}

// TODO: use composable

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  const siteUrl = runtimeConfig.public.siteUrl || ''
  const route = useRoute()

  const canonicalUrl = computed(() => joinURL(siteUrl, route.path))

  return {
    provide: {
      joinSiteUrl: (...path: string[]) => joinURL(siteUrl, ...path),
      isInternalLink: (url: string | undefined) => isInternalUrl(url),
      isExternalLink: (url: string | undefined) => isExternalUrl(url, siteUrl),
      getInternalPageUrl: (route: RouteLocationRaw) => {
        const router = useRouter()
        const path = router.resolve(route).path

        return joinURL(siteUrl, path)
      },
      canonicalUrl,
    },
  }
})
