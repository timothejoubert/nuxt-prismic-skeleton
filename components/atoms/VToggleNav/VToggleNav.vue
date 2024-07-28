<script setup lang="ts">
</script>

<template>
    <button :class="$style.root">
        Menu
    </button>
</template>

<style lang="scss" module>
.root {
    position: relative;
    padding: rem(15) rem(30);
    background-color: var(--color-primary-darker-80);
    color: var(--color-primary);
    font-family: $noi;
    font-size: rem(16);
    font-weight: 650;
    text-transform: uppercase;
}
</style>
