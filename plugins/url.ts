type LinkPath = string | undefined

function isInternal(path: LinkPath, siteUrl?: string) {
  return (path && path?.charAt(0) === '/') || path?.charAt(0) === '#' || (siteUrl && path?.startsWith(siteUrl))
}

function isExternal(path: LinkPath, siteUrl?: string) {
  return path && !isInternal(path, siteUrl)
}

export default defineNuxtPlugin(() => {
  const siteUrl = useRuntimeConfig().public.siteUrl

  return {
    provide: {
      link: {
        isInternal: (path: LinkPath) => isInternal(path, siteUrl),
        isExternal: (path: LinkPath) => isExternal(path, siteUrl),
      },
    },
  }
})
