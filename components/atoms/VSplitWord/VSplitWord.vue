<script lang="ts" setup>
import { getSlotInnerText } from '~/utils/slots/get-slot-inner-text'

interface letterContent {
  id: string
  character: string
  isAfterSpace: boolean
}

interface VSplitWordProps {
  tag?: string
  content?: string
  playAnimation?: boolean
}

const props = defineProps<VSplitWordProps>()
const slots = useSlots()

console.log(slots.default, getSlotInnerText(slots.default))
const characterList = computed(() => {
  const string = props.content || getSlotInnerText(slots.default) || ''
  return string.split('')
})

const letterList = computed((): letterContent[] | undefined => {
  const letters = characterList.value

  if (!letters?.length) return

  return letters
    .map((letter: string, i: number) => {
      return {
        id: letter + '-' + i,
        character: letter,
        isAfterSpace: i > 0 && letters?.[i - 1] === ' ',
      }
    })
    .filter((letter) => letter.character !== ' ')
})

const $style = useCssModule()
const rootClasses = computed(() => {
  return [$style.root, props.playAnimation && $style['root--animate']]
})
</script>

<template>
  <ClientOnly :placeholder-tag="tag" :placeholder="content">
    <component :is="tag || 'div'" v-if="characterList?.length" :class="[rootClasses, $attrs.class]">
      <div
        v-for="(letter, i) in letterList"
        :key="letter.id"
        :class="[$style.letter, letter.isAfterSpace && $style['letter--after-space']]"
        :style="{ '--letter-index': i }"
        :data-content="letter.character"
      >
        {{ letter.character }}
      </div>
    </component>
  </ClientOnly>
</template>

<style lang="scss" module>
.root {
  position: relative;
  display: flex;
  overflow: hidden;
}

.letter {
  position: relative;
  //display: block;
  opacity: 1;

  &--after-space {
    margin-left: 0.3em;
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    content: attr(data-content);
    opacity: 0;
    transition: opacity 300ms calc(var(--letter-index) * 20ms) ease(out-quad);
    translate: 0 100%;
  }

  .root--animate & {
    animation: slide-up var(--split-word-duration, 350ms) calc(var(--letter-index) * 20ms) ease(out-quad);
  }

  .root--animate &::after {
    opacity: 1;
  }

  @media (hover: hover) {
    .root:not(.root--animate):hover & {
      animation: slide-up var(--split-word-duration, 350ms) calc(var(--letter-index) * 20ms) ease(out-quad);
    }

    .root:not(.root--animate):hover &::after {
      opacity: 1;
    }
  }
}

@keyframes slide-up {
  to {
    translate: 0 -100%;
  }
}
</style>
