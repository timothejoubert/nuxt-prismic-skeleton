<script setup lang="ts">
import type { SharedSlice } from '@prismicio/types'

interface VSliceProps {
    slice: SharedSlice
}
defineProps<VSliceProps>()
</script>

<template>
    <section
        :id="slice.id"
        :class="$style.root"
    >
        <slot />
    </section>
</template>

<style lang="scss" module>
.root {
  width: 100%;

  @include line(top);
  @include property-fluid(padding-bottom, (xs: 68, xl: 82));
}
</style>
