<script setup lang="ts">
import { getDocumentData } from '~/utils/prismic/document-data'

const { mainMenu } = useCommonContent()

const links = mainMenu && getDocumentData(mainMenu, 'links')

const selectedIndex = ref(0)
const route = useRoute()

watch(
    () => route.path,
    () => {
        selectedIndex.value = links?.findIndex((link) => link.document?.url === route.path) || 0
    },
    { immediate: true },
)

function onFocus() {
    // TODO: update selectedIndex ?
}
</script>

<template>
    <nav :class="$style.root">
        <ul :class="$style.list">
            <li v-for="item in links" :key="item" :class="$style.item">
                <NuxtLink :to="item.document.url" :class="$style.link" @focus="onFocus"
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
    z-index: 11;
    top: 0;
    display: flex;
    height: var(--v-top-bar-height);
    align-items: center;

    &::after {
        position: absolute;
        z-index: -2;
        background-color: color(primary);
        content: '';
        inset: 0;
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
    z-index: 2;
    display: flex;
    height: 100%;
    flex-basis: 100%;
    align-items: center;
    justify-content: space-between;
    padding-inline: rem(30);

    .item:first-child &::before {
        position: absolute;
        z-index: -1;
        background-color: color(secondary);
        content: '';
        inset: 0;
        opacity: 0.6;
        transition: translate 0.4s;
        translate: calc(v-bind('selectedIndex') * 100%) 0;
    }
}
</style>
