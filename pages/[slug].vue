<script lang="ts" setup>
import type { HomeDocument } from '~/prismicio-types'

const { webResponse, pageData, alternateLinks, error } = await useFetchPage<HomeDocument>('home')
if (error) showError(error)

usePage({
  webResponse: webResponse.value,
  alternateLinks: alternateLinks.value,
})
</script>

<template>
  <div>
    <h1>Web response page</h1>
    <pre>{{ pageData }}</pre>
  </div>
</template>
