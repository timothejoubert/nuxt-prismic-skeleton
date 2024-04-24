<script lang="ts" setup>
import type { FilledLinkToWebField } from '@prismicio/types'
import VIcon from '~/components/atoms/VIcon/VIcon.vue'
import { isFilledLinkToWebField } from '~/utils/prismic/guard'
import type { SettingDocumentDataSocialsItem } from '~/prismicio-types'

const getSocialIconName = (name?: string | null) => {
  if (!name) return ''

  switch (name.toLowerCase()) {
    case 'instagram':
      return 'social-instagram'
    case 'facebook':
      return 'social-facebook'
    case 'twitter':
      return 'social-twitter'
    case 'tiktok':
      return 'social-tiktok'
    case 'vimeo':
      return 'social-vimeo'
    case 'behance':
      return 'social-behance'
    case 'youtube':
      return 'social-youtube'
    case 'linkedin':
      return 'social-instagram'
    default:
      return ''
  }
}

defineProps({
  displayIcon: Boolean,
})

export interface SocialsContent {
  name: SettingDocumentDataSocialsItem['type']
  icon: ReturnType<typeof getSocialIconName>
  link: FilledLinkToWebField | undefined
  label?: string
}

const { setting } = useCommonContent()
const socialList = computed((): SocialsContent[] => {
  const socials = setting.value?.socials

  if (!socials?.length) return []

  return socials.map((item) => {
    return {
      link: isFilledLinkToWebField(item.link) ? item.link : undefined,
      name: item.type,
      icon: getSocialIconName(item.type),
      label: item.name || '',
    }
  })
})
</script>

<template>
  <div :class="$style.root">
    <a
      v-for="(social, i) in socialList"
      :key="'social-' + i"
      :class="$style.link"
      :href="social.link.url"
      :target="social.link.target"
      :rel="social.link.target ? 'noopener nofollow' : undefined"
      :title="social.name"
    >
      <VIcon v-if="displayIcon" :name="social.icon" />
      <span v-else>{{ social.label || social.link.url }}</span>
    </a>
  </div>
</template>

<style lang="scss" module>
.root {
  display: flex;
  gap: rem(12);
}

.link {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: opacity 0.3s;

  @media (hover: hover) {
    &:hover {
      opacity: 1;
    }
  }
}
</style>
