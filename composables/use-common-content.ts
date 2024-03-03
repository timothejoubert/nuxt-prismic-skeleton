import type { MenuDocument, SettingDocument } from '~/prismicio-types'

export interface CommonContent {
  setting: SettingDocument
  mainMenu: MenuDocument
}

export function useCommonContent() {
  const commonContent = useNuxtData<CommonContent>('common_content').data

  const runtimeConfig = useRuntimeConfig()
  // can't use i18n composable when useCommonContent is call from 00.init.ts plugin
  const { $i18n } = useNuxtApp()

  const siteName = computed(() => setting.value?.site_name || runtimeConfig.public.siteName)
  const homeBasePath = computed(() => {
    if ($i18n.locale.value === $i18n.fallbackLocale.value) return '/'
    return `/${$i18n.locale.value}`
  })

  const setting = computed(() => commonContent.value?.setting.data)
  const mainMenu = computed(() => commonContent.value?.mainMenu.data)
  return { siteName, homeBasePath, setting, mainMenu }
}
