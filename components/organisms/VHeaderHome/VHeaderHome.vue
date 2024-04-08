<script lang="ts" setup>
import type { HomePageDocumentData } from '~/prismicio-types'

interface VHeaderHomeProps {
  pageData: HomePageDocumentData
}

const props = defineProps<VHeaderHomeProps>()

const splashScreenState = useSplashScreenState()
const isSplashScreenDone = computed(() => splashScreenState.value === 'done')

const isCtaHovered = ref(false)
const isVideoFullscreen = ref(false)

const videoUrl = computed(() => props.pageData?.embed_video_url)

// TODO: Create VEmbedVideo and use plyr for set video state
function setVideoFullscreen() {}
</script>

<template>
  <header :class="$style.root" class="container-fullscreen">
    <h1 v-if="pageData.title && isSplashScreenDone" class="text-h1">{{ pageData.title }}</h1>
    <VText
      v-if="pageData.subtitle && isSplashScreenDone"
      :content="pageData.subtitle + '-' + pageData?.embed_video_url"
      :class="$style.tagline"
      class="text-h5"
      tag="h2"
    />
    <div v-if="videoUrl" :class="$style['media-wrapper']">
      <VVideoPlayer
        v-if="pageData?.embed_video_url"
        :src="pageData?.embed_video_url"
        playsinline
        background
        fit="cover"
        embed-id="PriOYrrl_ec"
        embed-platform="youtube"
        loop
        title="Showreel Hugo Tomasi"
        :class="$style.video"
      />
    </div>

    <div :class="$style.body">
      <div :class="$style['body__head']" class="v-header-home-head-bottom">
        <span v-if="pageData.sub_section_title" :class="$style['over-title']" class="text-over-title-s">
          {{ pageData.sub_section_title }}
        </span>
        <div :class="$style['video-cta']" @click="setVideoFullscreen">
          <VSplitWord
            class="text-body-xs"
            :class="$style['video-cta__label']"
            :play-animation="isCtaHovered"
            :content="$t('showreel.cta_label')"
            @mouseenter="isCtaHovered = true"
            @mouseleave="isCtaHovered = false"
          />
          <VButton
            v-if="videoUrl"
            filled
            theme="dark"
            icon-name="fullscreen"
            :class="$style['button-fullscreen']"
            @mouseenter="isCtaHovered = true"
            @mouseleave="isCtaHovered = false"
          />
        </div>
      </div>
      <div :class="$style.bottom">
        <VText
          v-if="pageData.sub_section_content"
          :content="pageData.sub_section_content"
          :class="$style.description"
          class="text-body-s"
        />
        <VText
          v-if="pageData.sub_section_aside"
          :content="pageData.sub_section_aside"
          :class="$style.excerpt"
          class="text-body-s"
        />
      </div>
    </div>
  </header>
</template>

<style lang="scss" module>
.root {
  position: relative;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  padding-top: var(--v-top-bar-height);
  margin-top: calc(var(--v-top-bar-height) * -1);
  background-color: color(black);
  color: color(white);
  isolation: isolate;
  padding-inline: var(--page-gutter);
}

.tagline {
  max-width: max(31%, rem(330));
  margin-top: rem(18);
}

.media-wrapper {
  position: absolute;
  z-index: -1;
  top: 0;
  inset: 0;
  overflow: hidden;

  &::after {
    position: absolute;
    background-color: rgba(color(black), 0.9);
    content: '';
    inset: 0;
    pointer-events: none;
  }
}

.video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  :global(video) {
    width: 100vw !important;
    height: 100vh !important;
    object-fit: cover;
  }
}

.body {
  margin-top: auto;
  margin-bottom: rem(36);

  @include media('<md') {
    padding-top: rem(200);
  }
}

.body__head {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-bottom: rem(16);
  margin-bottom: rem(16);

  &::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 1px;
    background-color: rgba(color(white), 0.3);
    content: '';
  }
}

.video-cta {
  display: none;

  @include media('>=md') {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: rem(10);
    translate: 0 -50%;
  }
}

.video-cta__label {
  --split-word-duration: 300ms;

  position: absolute;
  opacity: 0;
  transition: opacity 0.3s;
  translate: calc((100% + 10px) * -1) 0;

  .video-cta:hover & {
    opacity: 1;
  }
}

.button-fullscreen {
  --v-button-padding-inline: 0;
}

.bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: rem(20) rem(30);
}

.excerpt,
.description {
  width: min(100%, rem(420));

  & *:not(strong) {
    opacity: 0.7;
  }
}
</style>
