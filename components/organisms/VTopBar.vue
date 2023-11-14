<script setup lang="ts">
import { getDocumentData } from "~/utils/prismic/document-data";

const { mainMenu } = useCommonContent();

const links = mainMenu && getDocumentData(mainMenu, "links");
</script>

<template>
    <nav :class="$style.root">
        <ul :class="$style.list">
            <li v-for="item in links" :key="item" :class="$style.item">
                <NuxtLink :to="item.document.uid" :class="$style.link"
                    >{{ item.label }}
                    <VAppSymbol />
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" module>
.root {
}

.list {
    display: flex;
    align-items: center;
}

.item {
    display: contents;
}

.link {
    display: flex;
    justify-content: space-between;
    flex-basis: 100%;
    padding: rem(8) rem(30);
    background-color: color(primary);

    &:global(.router-link-active) {
        background-color: color(secondary);
    }
}
</style>
