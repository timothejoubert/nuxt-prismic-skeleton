<script lang="ts" setup>
import type { HomePageDocument } from '~/prismicio-types'
import type { PageProps } from '~/types/app'

defineProps<PageProps<HomePageDocument>>()
</script>

<template>
  <VHeaderHome :page-data="prismicDocument.data" />
</template>
