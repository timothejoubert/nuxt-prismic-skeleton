<script setup lang="ts">
import type { KeyTextField } from '@prismicio/types'
import { createTextVNode } from 'vue'
import { VArrow } from '#components'

interface VArrowTitle {
    title: string | KeyTextField
    href: string
}

const props = defineProps<VArrowTitle>()

const words = computed(() => props.title?.split(' ') || [])
const arrowPosition = computed(() => words.value.length < 2 ? 0 : 1)

const $style = useCssModule()

const outputWords = computed(() => {
    const mergedWords = words.value.toSpliced(arrowPosition.value, 0, 'custom-button')

    return mergedWords.reduce((acc: string[], curr: string, i: number) => {
        if (i < arrowPosition.value) {
            acc.push(curr)
        }
        else if (i === arrowPosition.value) {
            const joinedNextWords = words.value.slice(i).join(' ')
            acc.push(curr, joinedNextWords)
        }

        return acc
    }, [])
})

const nodeList = computed(() => {
    return outputWords.value.map((item) => {
        if (item === 'custom-button') {
            const arrowNode = h(VArrow, {
                href: props.href,
                class: $style.arrow,
                direction: 'bottom',
                size: 'lg',
            })

            return [() => h('br'), () => arrowNode]
        }
        else {
            return createTextVNode(item)
        }
    }).flat()
})
</script>

<template>
    <h1
        class="text-h1"
        :class="$style.root"
    >
        <component
            :is="node"
            v-for="node in nodeList"
            :key="node"
        />
    </h1>
</template>

<style lang="scss" module>
.root {
  position: relative;

  //display: flex;
  //flex-wrap: wrap;
  //gap: 0 1rem;
}

.arrow {
  height: 1lh;
  margin-right: 2rem;
  translate: 0 -0.33lh;
}
</style>
