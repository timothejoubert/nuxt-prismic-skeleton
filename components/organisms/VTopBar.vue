<script setup lang="ts">
import { getDocumentData } from "~/utils/prismic/document-data";

const { mainMenu } = useCommonContent();

const links = mainMenu && getDocumentData(mainMenu, "links");

const selectedIndex = ref(0);
const route = useRoute();

watch(
    () => route.path,
    () => {
        selectedIndex.value =
            links?.findIndex((link) => link.document?.url === route.path) || 0;
    },
    { immediate: true },
);
</script>

<template>
    <nav :class="$style.root">
        <ul :class="$style.list">
            <li v-for="item in links" :key="item" :class="$style.item">
                <NuxtLink :to="item.document.url" :class="$style.link"
                    >{{ item.label }}
                    <VAppSymbol />
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" module>
.root {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    height: var(--v-top-bar-height);
    z-index: 11;

    &::after {
        position: absolute;
        content: "";
        inset: 0;
        background-color: color(primary);
        z-index: -2;
    }
}

.list {
    display: contents;
}

.item {
    display: contents;
}

.link {
    position: relative;
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    flex-basis: 100%;
    padding-inline: rem(30);
    z-index: 2;

    .item:first-child &::before {
        position: absolute;
        content: "";
        inset: 0;
        transition: translate 0.4s;
        translate: calc(v-bind("selectedIndex") * 100%) 0;
        background-color: color(secondary);
        opacity: 0.6;
        z-index: -1;
    }
}
</style>
