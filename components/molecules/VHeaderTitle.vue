<script lang="ts" setup>
import { gsap } from 'gsap'
import EventType from '~/constants/event-type'

const props = defineProps<{ content: string }>()

const wordList = props.content.split(' ')

const items = computed(() => {
    return wordList.reduce((acc: string[], word: string, index: number) => {
        if (index === wordList.length - 1) acc.push('button')

        acc.push(word)
        return acc
    }, [])
})

const itemElements = ref<(HTMLElement | ComponentPublicInstance)[]>([])
const getItems = () =>
    itemElements.value.map((instance) => (instance as ComponentPublicInstance)?.$el || instance).filter((t) => !!t)

function revealItems() {
    gsap.fromTo(
        getItems(),
        { y: '100%' },
        { opacity: 1, y: 0, yPercent: 10, stagger: 0.07, duration: 0.6, ease: 'power2.out' },
    )
}

function leaveItems() {
    gsap.fromTo(
        getItems(),
        { y: 0, opacity: 1 },
        { opacity: 0, y: '100%', stagger: 0.04, duration: 0.3, ease: 'power2.out' },
    )
}

const isFirstPageVisited = useFirstPageVisited()

onMounted(() => {
    if (isFirstPageVisited.value) revealItems()
})

usePageTransitionEvent(EventType.PAGE_TRANSITION_ENTER, revealItems)
// usePageTransitionEvent(EventType.PAGE_TRANSITION_LEAVE, leaveItems)
</script>

<template>
    <h1 :class="$style.root" class="text-h1">
        <template v-for="(word, wordIndex) in items" :key="wordIndex">
            <template v-if="word === 'button'">
                <br v-if="wordIndex !== 0" />
                <VButton ref="itemElements" filled :class="$style.button">button</VButton>
            </template>
            <div
                v-for="(letter, letterIndex) in word"
                v-else
                :key="letterIndex"
                :class="$style['wrapper-letter']"
                :style="{ '--letter-index': letterIndex.toString() }">
                <span ref="itemElements" :class="$style.letter">{{ letter }}</span>
            </div>
        </template>
    </h1>
</template>

<style lang="scss" module>
.root {
}

.wrapper-letter {
    display: inline-flex;
    overflow: hidden;
    align-items: center;
    line-height: 0.8;
}

.button,
.letter {
    display: inline-block;
    line-height: 0.8;
    opacity: 0;

    //translate: 0 100%;
}
</style>
