<script setup lang="ts">
import { getSlotInnerText } from '~/utils/slots/get-slot-inner-text'

interface VSplitWordsProps {
    tag?: string
    setIndex?: boolean
    content: string
}

const props = defineProps<VSplitWordsProps>()

const content = props.content || getSlotInnerText(useSlots())
const wordList = content.split(' ').filter((word: string) => word !== ' ')

const letterCount = ref(0)

// const words = wordList.map((word: string, index: number) => {
//     letterCount += words?.[index - 1]?.length || 0
//
//     return createElement(
//         context.props.tag,
//         {
//             class: [context.data.class, context.$style.root],
//             staticClass: (context.data?.staticClass || '') + ' split-word',
//             style: { '--word-index': index.toString() } as { [key: string]: string },
//         },
//         [
//             createElement(VSplitLetters, {
//                 props: { content: word, previousWordLength: letterCount, variableFont: true },
//             }),
//         ],
//     )
// })

defineOptions({
    inheritAttrs: false,
})
</script>

<template>
    <div v-for="(word, i) in wordList" :key="i" :class="$attrs.class" :style="setIndex && { '--word-index': i }">
        <VSplitLetters :content="word" :previous-word-length="letterCount" />
    </div>
</template>
