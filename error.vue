<script setup lang="ts">
type PageError = {
  error: {
    url: string
    statusCode: number
    statusMessage: string
    message: string
    description: string
    data: any
  }
}
defineProps<PageError>()
</script>

<template>
  <NuxtLayout name="default">
    <h1>Error page</h1>
    <pre>{{ error }}</pre>
  </NuxtLayout>
</template>

<style lang="scss" module></style>
