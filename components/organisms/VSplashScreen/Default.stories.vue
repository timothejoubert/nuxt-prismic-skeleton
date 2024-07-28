<script lang="ts" setup>
const state = useSplashScreenState()

const restart = () => (state.value = 'beforeEnter')
</script>

<template>
    <VStory :class="$style.root">
        <template #settings>
            <button @click="restart">
                Restart
            </button>
        </template>
        <VSplashScreen value="beforeEnter" />
    </VStory>
</template>

<style lang="scss" module>
.root {
  position: relative;
  height: calc(100% - var(--v-stories-top-bar-height));
}
</style>
