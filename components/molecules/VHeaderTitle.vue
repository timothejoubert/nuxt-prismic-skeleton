<script lang="ts" setup>
import { gsap } from 'gsap'
import EventType from '~/constants/event-type'
import { getHtmlElement } from '~/utils/ref/get-html-element'

const props = defineProps<{ content: string }>()

const wordList = props.content.split(' ')

const items = computed(() => {
    return wordList.reduce((acc: string[], word: string, index: number) => {
        if (index === wordList.length - 1) acc.push('button')

        acc.push(word)
        return acc
    }, [])
})

const root = ref<HTMLElement | null>(null)
const itemElements = ref<(HTMLElement | ComponentPublicInstance)[]>([])
const getItems = () => itemElements.value.map((instance) => getHtmlElement(instance))

function revealItems() {
    gsap.set(getItems(), { y: '100%' })

    gsap.to(getItems(), {
        opacity: 1,
        y: 0,
        onStart: () => {
            gsap.set(root.value, { opacity: 1 })
        },
        yPercent: 10,
        stagger: 0.07,
        duration: 0.6,
        ease: 'power2.out',
    })
}

function leaveItems() {
    console.log('VHeader leaveItems')

    gsap.fromTo(
        getItems(),
        { y: 0, opacity: 1 },
        {
            opacity: 0,
            y: '100%',
            stagger: 0.04,
            duration: 1,
            ease: 'power2.out',
        },
    )
}

useFirstPageEnter(revealItems)
usePageTransitionEvent(EventType.PAGE_TRANSITION_ENTER, revealItems)
// usePageTransitionEvent(EventType.PAGE_TRANSITION_LEAVE, leaveItems)
</script>

<template>
    <h1 ref="root" :class="$style.root" class="text-h1">
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
    position: relative;
    opacity: 0;
    min-height: calc(100vw / (587 / 295));

    &:after {
        position: absolute;
        content: '';
        background-color: color(dark);
        height: 1px;
        width: calc(100% + var(--gutter));
        left: 0;
        bottom: 0;
    }
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
}
</style>
