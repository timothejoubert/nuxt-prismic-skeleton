import path from 'path'
import { defineNuxtModule, resolveFiles } from '@nuxt/kit'
import type { NuxtPage } from '@nuxt/schema'
import { minimatch } from 'minimatch'
import { trimSlashes } from '../utils/string/trim-slashes'
import { pascalToKebabCase } from '../utils/string/pascal-to-kebab-case'

export interface ModuleOptions {
  route?: NuxtPage
  include?: string
  root?: string[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'stories',
    configKey: 'stories',
  },
  setup(options, nuxt) {
    // process.env.STORIES allows to run stories in production (`build:stories` used for debug only)
    if (!nuxt.options.dev && !nuxt.options._prepare && process.env.STORIES !== '1') return

    const route = options?.route

    if (!route) return

    const include = options.include || '**/*.stories.vue'
    const root = options.root || []

    const getFileRoute = (file: string): NuxtPage => {
      const filePath = trimSlashes(
        file
          .replace(nuxt.options.rootDir, '')
          .split('/')
          .filter((pathPart) => !root.includes(pathPart))
          .join('/')
          .split('.')[0],
      )
      const routePath = pascalToKebabCase(filePath)

      return {
        name: routePath,
        path: routePath,
        meta: {
          filePath,
        },
        file,
      }
    }
    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        priority: 2,
        path: nuxt.options.rootDir + '/stories/commons',
        pathPrefix: false,
      })
    })

    nuxt.hook('pages:extend', async (pages) => {
      const files = await resolveFiles(nuxt.options.rootDir, include)

      route.children = route.children || []

      files.forEach((file) => {
        const fileRoute = getFileRoute(file)

        // INFO: Add meta crash
        // https://github.com/nuxt/nuxt/issues/25513
        route.children!.push({ ...fileRoute, meta: {} })
      })

      pages.push({
        ...route,
        path: path.join(route.path, '/:story*'),
      })
    })

    nuxt.hook('builder:watch', (event, path) => {
      if (!minimatch(path, include)) return

      if (event === 'add' || event === 'unlink') {
        nuxt.callHook('restart')
      }
    })
  },
})
