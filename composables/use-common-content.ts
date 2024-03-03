import type { MenuDocument, SettingDocument } from '~/prismicio-types'

export interface CommonContent {
  setting: SettingDocument
  mainMenu: MenuDocument
}

export function useCommonContent() {
  const commonContent = useNuxtData<CommonContent>('common_content').data
  console.log('useCommonContent', commonContent.value)

  const runtimeConfig = useRuntimeConfig()
  const siteName = computed(() => setting.value?.site_name || runtimeConfig.public.siteName)

  const setting = computed(() => commonContent.value?.setting.data)
  const mainMenu = computed(() => commonContent.value?.mainMenu.data)
  return { siteName, setting, mainMenu }
}
