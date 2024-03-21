<template>
  <div :class="[$style.root, isOpen && $style['root--open']]">
    <div :class="$style.tags">
      <div
        v-for="(tag, i) in projectTags"
        :key="tag"
        :class="[$style.tag, isSelected(tag) && $style['tag--selected']]"
        :style="selectedIndex > i && { '--tag-line-transform-origin': 'right' }"
        @click.prevent="onClick(tag)"
      >
        <input
          :id="parseFilterId(tag)"
          type="checkbox"
          name="tags"
          :checked="selectedTags?.includes(tag)"
          :class="$style.input"
        />
        <label :for="parseFilterId(tag)" :class="$style.label">{{ tag }}</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface VProjectFilterProps {
  isOpen: boolean
  tags: string[]
}
const props = defineProps<VProjectFilterProps>()

const selectedTags = defineModel<string[]>({ default: [] })

const projectTags = computed((): string[] => {
  return [ALL_TAG, ...new Set(props.tags)]
})

const selectedIndex = computed((): number => {
  return projectTags.value.findIndex((tag) => selectedTags.value.includes(tag))
})

const ALL_TAG = 'All'
const ALLOW_MULTIPLE_TAGS = false

function parseFilterId(tag: string): string {
  return 'v-filter-project-' + tag
}

function onClick(tag: string) {
  if (tag === ALL_TAG) {
    selectedTags.value = []
    return
  }
  if (!ALLOW_MULTIPLE_TAGS) {
    selectedTags.value = [tag]
  } else {
    const filterTagList = selectedTags.value.slice()
    const indexOfTag = filterTagList.indexOf(tag)

    if (indexOfTag === -1) {
      filterTagList.push(tag)
    } else {
      filterTagList.splice(indexOfTag, 1)
    }

    selectedTags.value = filterTagList
  }
}

function isSelected(tag: string): boolean {
  if (tag === ALL_TAG && !selectedTags.value.length) return true
  else return selectedTags.value.includes(tag)
}
</script>

<style lang="scss" module>
.root {
  display: grid;
  justify-content: end;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease(out-quad);

  &--open {
    grid-template-rows: 1fr;
  }
}

.tags {
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  gap: 0 rem(16);
}

.tag {
  position: relative;
  margin-block: rem(4) rem(14);
  opacity: 0.5;
  transition: opacity 0.3s ease(out-quad);
  white-space: nowrap;

  &::after {
    position: absolute;
    bottom: rem(-2);
    left: 0;
    width: 100%;
    height: 1px;
    background-color: color(black);
    content: '';
    opacity: 0.2;
    scale: 0 1;
    transform-origin: var(--tag-line-transform-origin, left);
    transition:
      scale 0.3s ease(out-quad),
      transform-origin 0s 0.3s;
  }

  &--selected::after {
    scale: 1 1;
  }

  &--selected {
    opacity: 0.9;
  }

  @media (hover: hover) {
    &:hover {
      opacity: 0.9;
    }
  }
}

.input {
  display: none;
}

.label {
  cursor: pointer;
}
</style>
