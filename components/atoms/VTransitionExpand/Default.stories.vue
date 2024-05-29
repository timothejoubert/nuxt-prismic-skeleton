<script setup lang="ts">
const isOpen = ref(false)
</script>

<template>
  <NuxtStory>
    <button @click="isOpen = !isOpen">{{ isOpen ? 'Reduce' : 'Expand' }}</button>
    <VTransitionExpand>
      <p v-show="isOpen">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium deserunt ducimus est fugiat hic impedit,
        inventore iusto, laboriosam maiores nisi similique, sunt vitae! Ab deleniti in ipsam nihil ullam ut.
      </p>
    </VTransitionExpand>
  </NuxtStory>
</template>

<style lang="scss" module></style>
