<script setup lang="ts">
import { type Content } from '@prismicio/client'

const props = defineProps(getSliceComponentProps<Content.PromoteSliceSlice>())

const title = computed(() => props.slice.primary.title)

const promoteList = computed(() => {
    return props.slice.items
})
</script>

<template>
    <section
        :class="$style.root"
        class="slice-container-xl"
    >
        <div
            v-if="title"
            class="text-over-title-m"
            :class="$style.title"
        >
            {{ title }}
        </div>

        <template v-if="promoteList?.length">
            <VLink
                v-for="(promote, i) in promoteList"
                :key="`${i}-${promote.title}`"
                :class="$style.wrapper"
                :reference="promote.link"
            >
                <div
                    v-if="promote.title"
                    :class="$style['promote-title']"
                >
                    {{ promote.title }}
                </div>
                <div
                    v-if="promote.content"
                    :class="$style.content"
                >
                    {{ promote.content }}
                </div>
                <div
                    v-if="promote.place"
                    :class="$style.place"
                >
                    {{ promote.place }}
                </div>
                <div
                    v-if="promote.year"
                    :class="$style.year"
                >
                    {{ promote.year }}
                </div>
                <VButton
                    :class="$style.cta"
                    :label="promote.link_label || $t('button.default_label')"
                    icon-name="arrow-up-right"
                />
            </VLink>
        </template>
    </section>
</template>

<style lang="scss" module>
.root {
}

.title {
  margin-bottom: rem(32);
  text-transform: uppercase;
}

.wrapper {
  --v-promote-border: 1px solid #{rgba(color(black), 0.2)};

  position: relative;
  display: flex;
  min-height: rem(73);
  align-items: center;
  border-top: var(--v-promote-border);
  gap: rem(16);
  padding-block: rem(16);

  &:last-child {
    border-bottom: var(--v-promote-border);
  }
}

.promote-title {
  min-width: rem(130);
  font-weight: 700;
  transition: transform 0.3s ease(out-quad);

  @media (hover: hover) {
    .wrapper:hover & {
      transform: translateX(rem(10));
    }
  }
}

.content {
  overflow: hidden;
  flex-grow: 1;
  font-weight: 300;
  opacity: 0.8;
  text-overflow: ellipsis;
}

.year,
.place {
  text-wrap: nowrap;

  &:not(:last-child)::after {
    position: relative;
    margin-left: rem(16);
    content: '|';
  }
}

.cta {
  --v-button-padding-inline: 0;
  --v-button-icon-margin: #{rem(0) rem(0) rem(0) rem(4)};
}
</style>
