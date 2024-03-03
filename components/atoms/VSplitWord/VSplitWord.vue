<script lang="ts" setup>
import { getSlotInnerText } from '~/utils/slots/get-slot-inner-text'

interface VSplitWordProps {
  tag?: string
  content?: string
  playAnimation?: boolean
}

const props = defineProps<VSplitWordProps>()
const slots = useSlots()

const slotContent = computed((): string | undefined => {
  return getSlotInnerText(slots.default)
})

const letters = computed((): { content: string; isAfterSpace: boolean }[] | undefined => {
  const letters = props.content?.split('') || slotContent.value?.split('')

  if (!letters?.length) return undefined

  return letters
    .map((letter: string, i: number) => {
      return {
        content: letter,
        isAfterSpace: i > 0 && letters[i - 1] === ' ',
      }
    })
    .filter((letter) => letter.content !== ' ')
})

const $style = useCssModule()
const rootClasses = computed(() => {
  return [$style.root, props.playAnimation && $style['root--animate']]
})
</script>

<template>
  <component :is="tag || 'div'" :class="rootClasses">
    <div
      v-for="(letter, i) in letters"
      :key="i"
      :class="[$style.letter, letter.isAfterSpace && $style['letter--after-space']]"
      :style="{ '--letter-index': i }"
      :data-content="letter.content"
    >
      {{ letter.content }}
    </div>
  </component>
</template>

<style lang="scss" module>
.root {
  position: relative;
  display: flex;
  overflow: hidden;
}

.letter {
  position: relative;
  display: block;
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
