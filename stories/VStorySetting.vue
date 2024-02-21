<script lang="ts" setup>
defineProps({ title: String })
const isOpen = ref(false)
const toggle = () => (isOpen.value = !isOpen.value)
</script>

<template>
  <div :class="$style.root">
    <button :class="$style.title" @click="toggle">{{ title }} [{{ isOpen ? '−' : '+' }}]</button>
    <div v-show="isOpen" :class="$style.content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" module>
.root {
  position: sticky;
  z-index: 2;
  top: 0;
  padding: 10px 20px;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  background-color: #f1f1f1;
  font-size: 14px;
}

.title {
  min-height: 20px;
}

.content {
  display: flex;
  flex-wrap: wrap;
  margin-block: 20px;
  gap: 40px;
  white-space: pre-wrap;
}
</style>
