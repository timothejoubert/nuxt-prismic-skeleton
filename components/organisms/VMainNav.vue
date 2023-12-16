<script setup lang="ts">
import gsap from 'gsap'
import type { ComponentPublicInstance } from 'vue'
import { getDocumentData } from '~/utils/prismic/document-data'
import { getHtmlElement } from '~/utils/ref/get-html-element'
import { useSetGlobalCssVar } from '~/composables/use-set-global-css-var'

const { mainMenu } = useCommonContent()

const indicator = ref<HTMLElement | null>(null)
const linkItem = ref<ComponentPublicInstance[]>([])
const links = (mainMenu && getDocumentData(mainMenu, 'links')) || []

// ROUTE CHANGED
const selectedIndex = ref<number | null>(null)
const route = useRoute()

function setSelectedIndexByRoute() {
    selectedIndex.value = links?.findIndex((link) => link.document?.url === route.path) || 0
}

function setIndicatorPosition() {
    const el = getHtmlElement(linkItem.value[selectedIndex.value || 0])
    if (!el) return

    gsap.to(indicator.value, {
        x: el.offsetLeft,
        y: el.offsetTop,
        width: el.offsetWidth,
        height: el.offsetHeight,
        ease: 'power2.out',
        duration: 0.3,
    })
}

watch(() => route.path, setSelectedIndexByRoute)
watch(selectedIndex, setIndicatorPosition)
onMounted(setSelectedIndexByRoute)
useEventListener('resize', () => {
    gsap.set(indicator.value, { clearProps: 'width' })
})
function onFocus(i: number) {
    selectedIndex.value = i
}

// GET NAV HEIGHT
const root = ref<HTMLElement | null>(null)
const rootHeight = ref(0)
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
    if (root.value) {
        resizeObserver = new ResizeObserver(
            ([entry]) => (rootHeight.value = (entry.target as HTMLElement).offsetHeight),
        )
        resizeObserver.observe(root.value)
    } else {
        console.warn('main nav root not found')
    }
})

onUnmounted(() => {
    resizeObserver?.disconnect()
    resizeObserver = null
})

watch(rootHeight, () => {
    useSetGlobalCssVar('v-top-bar-height', rootHeight)
})
</script>

<template>
    <nav ref="root">
        <ul v-if="links.length" :class="$style.list">
            <li v-for="(item, i) in links" :key="item" :class="$style.item">
                <VLink ref="linkItem" :reference="item.document" :class="$style.link" @focus="onFocus(i)"
                    >{{ item.label }}
                    <VAppSymbol />
                    <div v-if="i === 0" ref="indicator" :class="$style.indicator"></div>
                </VLink>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" module>
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
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: rem(12) rem(30);
}

.indicator {
    position: absolute;
    z-index: -1;
    background-color: red;
    inset: 0;
}
</style>
