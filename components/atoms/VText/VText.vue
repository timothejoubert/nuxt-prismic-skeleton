<script lang="ts" setup>
import type { RichTextField } from '@prismicio/types'

interface VTextProps {
  tag?: string
  textClass?: string
  content: string | RichTextField
}

const props = defineProps<VTextProps>()

const isRichTextFilled = computed(() => {
  return !!(props.content?.[0] as Partial<Record<'text', string>>)?.text
})
</script>

<template>
  <component :is="tag || 'div'" v-if="typeof content === 'string'">{{ content }}</component>
  <PrismicRichText v-else-if="isRichTextFilled" :field="content" />
</template>
