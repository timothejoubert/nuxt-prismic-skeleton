<script setup lang="ts">
import type { PageProps } from '~/types/app'
import type { AboutPageDocument } from '~/prismicio-types'

const props = defineProps<PageProps<AboutPageDocument>>()
const pageData = computed(() => props.prismicDocument.data)

const emailCopied = ref(false)

const { setting } = useCommonContent()
const email = computed(() => setting.value?.email)

function onClipBoardSuccess() {
  emailCopied.value = true
  window.setTimeout(() => (emailCopied.value = false), 2000)
}

function onMailClicked() {
  if (!email.value) return

  navigator.clipboard.writeText(email.value).then(onClipBoardSuccess, (error) => {
    console.warn('Failed to copy in clipboard', error)
  })
}
</script>

<template>
  <div :class="$style.root">
    <header :class="$style.header">
      <VPrismicImage
        :reference="pageData.main_media"
        width="700"
        height="550"
        :class="$style.media"
        loading="eager"
        sizes="xs:100vw sm:100vw md:50vw lg:45vw vl:45vw xl:45vw xxl:45vw hd:45vw qhd:45vw"
      />
      <VText v-if="pageData.content" class="text-h4" :content="pageData.content" :class="$style.content" />
      <div :class="$style.email" @click="onMailClicked">
        <transition :name="$style['email-copied']">
          <div v-if="emailCopied" class="text-body-xs" :class="$style['email__copied-success']">
            {{ $t('email.copied__success') }} 🔥🔥
          </div>
        </transition>
        <VSplitWord tag="button" class="text-over-title-s" :content="email" />
      </div>
      <VSocialList :class="$style.socials" display-icon />
    </header>
  </div>
</template>

<style lang="scss" module>
.root {
  margin-top: calc(var(--v-top-bar-height) * -1);
}

.header {
  background-color: color(black);
  padding-block: rem(160) rem(200);
  color: color(white);
  padding-inline: var(--page-gutter);
  display: grid;
  grid-template-columns: 1fr;
  gap: rem(24) rem(60);

  @include media('>=md') {
    grid-template-columns: 45fr 55fr;
    align-items: flex-end;
  }
}

.media {
  border-radius: rem(18);
  margin-inline: auto;
  grid-row: 5;
  width: 100%;

  @include media('>=md') {
    grid-row: 1/ 5;
    min-height: rem(400);
    object-fit: cover;
    align-self: flex-start;
  }
}

.content {
  width: clamp(#{rem(280), 90%, rem(750)});
  margin-bottom: 1ch;
  text-transform: uppercase;
  text-wrap: balance;

  @include media('>=md') {
    margin-top: 0.5ch;
  }
}

.email {
  position: relative;

  @include media('>=md') {
    grid-row: 3;
  }
}

.email__copied-success {
  position: absolute;
  padding: rem(8) rem(16);
  background: linear-gradient(color(white), rgba(color(white), 0.85));
  border-radius: rem(6);
  color: color(black);
  translate: 0 calc(-100% - #{rem(14)});
}

.email-copied:global(#{'-enter-active'}),
.email-copied:global(#{'-leave-active'}) {
  transition: translate, opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease(out-quart);
}

.email-copied:global(#{'-enter-from'}),
.email-copied:global(#{'-leave-to'}) {
  opacity: 0;
  translate: 0 rem(-8);
}

.socials {
  @include media('>=md') {
    grid-row: 4;
    margin-bottom: 1ch;
  }
}
</style>
