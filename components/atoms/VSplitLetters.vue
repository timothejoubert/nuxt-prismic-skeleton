<script setup lang="ts">
import { getSlotInnerText } from '~/utils/slots/get-slot-inner-text'

interface VSplitLettersProps {
    content: string
    setIndex?: boolean
}

const props = defineProps<VSplitLettersProps>()
const slot = useSlots()

const letters = computed(() => {
    const text = props.content || (slot && getSlotInnerText(slot)) || ''
    return text.split('').filter((c: string) => c !== ' ')
})

defineOptions({
    inheritAttrs: false,
})
</script>

<template>
    <span
        v-for="(letter, i) in letters"
        :key="i"
        :style="setIndex && { '--letter-index': i.toString() }"
        :class="$attrs.class"
        >{{ letter }}</span
    >
</template>
