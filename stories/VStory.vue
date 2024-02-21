<script setup lang="ts">
interface VStoryProps {
  propsObject?: Object
  layout?: 'default' | 'fullscreen'
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<VStoryProps>(), {
  layout: 'default',
})

const slots = defineSlots()
const hasSetting = slots.settings?.()

const stringifyProps = computed(() => {
  if (!props.propsObject) return

  const string = JSON.stringify(
    props.propsObject,
    (_key, value) => {
      if (Array.isArray(value)) return `[${value.join(', ')}]`
      return value
    },
    ' ',
  ).replace(/"([^"]+)":/g, '$1:')
  return string.substring(2, string.length - 1)
})
</script>

<template>
  <VStorySetting v-if="hasSetting" title="Settings">
    <slot name="settings" />
  </VStorySetting>
  <VStorySetting v-if="stringifyProps" title="Props type">
    <pre>{{ stringifyProps }}</pre>
  </VStorySetting>
  <div :class="[$style.root, $style['root--layout-' + layout]]" v-bind="$attrs">
    <slot />
  </div>
</template>

<style lang="scss" module>
.root {
  padding: 20px;

  &--layout-fullscreen {
    padding: 0;
  }
}
</style>
