<script setup lang="ts">
const { setting } = useCommonContent()

const email = setting?.data.email

function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
    <footer :class="$style.root">
        <button v-if="email">{{ email }}</button>
        <button :class="$style['scroll-top']" aria-label="scroll top" @click="scrollTop"></button>
    </footer>
</template>

<style lang="scss" module>
.root {
    display: flex;
    height: var(--v-footer-height);
    align-items: center;
    justify-content: center;
    background-color: color(dark);
    color: color(primary);
}

.scroll-top {
    position: absolute;
    width: rem(24);
    aspect-ratio: 1;
    background-color: color(primary);
}
</style>
