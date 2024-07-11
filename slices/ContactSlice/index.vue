<script setup lang="ts">
import { type Content } from '@prismicio/client'

const props = defineProps(getSliceComponentProps<Content.ContactSliceSlice>(['slice', 'index', 'slices', 'context']))
const sliceData = computed(() => props.slice.primary)

</script>

<template>
    <VSlice :slice="slice">
<!--      <VSliceHead :title="sliceData.title" />-->
      <VText :content="sliceData.content" :class="$style.content" class="text-body-lg" />
  </VSlice>
</template>
<style lang="scss" module>
.content {

}
</style>
