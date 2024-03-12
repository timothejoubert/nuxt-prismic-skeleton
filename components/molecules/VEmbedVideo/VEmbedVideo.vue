<script lang="ts">
import type { PropType, VNode } from 'vue'
import type Plyr from 'plyr'
import { nextTick } from 'vue'
import { getEmbedSrc } from '~/utils/media/embed'

export default defineComponent({
  props: {
    src: String,
    embedId: String,
    embedPlatform: String, // | 'youtube' | 'vimeo',
    controls: {
      type: Boolean,
      default: true,
    },
    autoplay: Boolean,
    muted: Boolean,
    playsinline: {
      type: Boolean,
      default: true,
    },
    loop: Boolean,
    background: Boolean,
    fit: String as PropType<'cover' | 'contain'>,
    youtube: Object as PropType<Record<string, string>>,
    vimeo: Object as PropType<Record<string, string>>,
    wrapper: {
      type: [String, Boolean],
      default: 'div',
    },
    plyr: Object as PropType<Plyr.Options>,
    interaction: Boolean, // the video is playing because of a user interaction
  },
  emits: ['ready'],
  setup(props, { emit }) {
    const playerElement = ref<HTMLElement | null>(null)
    const rootElement = ref<HTMLElement | null>(null)
    const $style = useCssModule()

    // POSTER
    const hadInteraction = ref(false)
    const onPosterClick = () => (hadInteraction.value = true)

    // EMBED
    const isEmbed = computed(() => !!props?.embedId && !!props?.embedPlatform)

    const embedSrc = computed(() => {
      if (!isEmbed.value) return

      const platform = props?.embedPlatform

      if (platform !== 'youtube' && platform !== 'vimeo') return

      let params: Record<string, string> = {}

      // Plyr progressive enhancement
      if (platform === 'youtube') {
        params = {
          iv_load_policy: '3',
          modestbranding: '1',
          playsinline: '1',
          showinfo: '0',
          rel: '0',
          enablejsapi: '1',
        }
      } else if (platform === 'vimeo') {
        params = {
          loop: 'false',
          byline: 'false',
          portrait: 'false',
          title: 'false',
          speed: 'true',
          transparent: '0',
          gesture: 'media',
        }
      }

      return getEmbedSrc(props.embedId as string, platform, params)
    })

    const needsInteraction = computed(() => {
      return (!props.autoplay || (props.autoplay && !props.muted && !props.interaction)) && !props.background
    })

    const shouldAppendPlayerContent = computed(() => {
      return (needsInteraction.value && hadInteraction.value) || !needsInteraction.value
    })

    // STYLE
    const classNames = computed(() => [
      $style.root,
      isEmbed.value && $style['root--embed'],
      props.fit === 'cover' && $style['root--cover'],
      needsInteraction.value && $style['root--poster'],
      shouldAppendPlayerContent.value && $style['root--player'],
    ])

    const playerStyle = computed(() => {
      const style: Record<string, string> = {}

      if (playerSize.value.length) {
        style.width = playerSize.value[0] + 'px'
        style.height = playerSize.value[1] + 'px'
      }

      return style
    })

    // PLAYER
    const playerSize = ref<number[]>([])
    let player: Plyr | null = null

    async function createPlayer() {
      if (player || !playerElement.value) return
      const options: Plyr.Options = {
        disableContextMenu: false,
        controls: ['play', 'progress', 'current-time', 'mute', 'fullscreen'],
        ...props.plyr,
        iconUrl: '/images/plyr-icons.svg', // TODO: use Vite to import this file. But it's not working for now.
        iconPrefix: 'plyr-icon',
        autoplay: props.background || props.autoplay || (needsInteraction.value && hadInteraction.value),
        muted: props.background || props.muted,
        loop: { active: props.background || props.loop },
      }
      const PlyrClass = await import('plyr').then((module) => module.default)

      // I don't know why but listeners property is not used by Plyr.
      // As a workaround I will define the listeners later with on().
      // Remove the listeners property to be sure that the callbacks are not called twice.
      delete options.listeners

      if (!props.controls || props.background) options.controls = []
      if (props.background) {
        options.clickToPlay = false
        options.fullscreen = { enabled: false }
      }
      if (props.vimeo) options.vimeo = props.vimeo
      if (props.youtube) options.youtube = props.youtube

      player = new PlyrClass(playerElement.value as HTMLElement, options)

      player.on('ready', onPlayerReady)

      // Fix listeners into Plyr options because the callbacks are never called.
      if (props.plyr?.listeners) {
        Object.keys(props.plyr.listeners).forEach((value) =>
          player!.on(value as keyof Plyr.PlyrEventMap, props.plyr!.listeners![value]),
        )
      }

      if (props.fit === 'cover') {
        window?.addEventListener('resize', updatePlayerSize, { passive: true })
        updatePlayerSize()
      }
    }

    function onPlayerReady() {
      // sometimes autoplay isn't working then force the video play
      if (props.autoplay || props.background) {
        // the player is initialized with muted property as true but sometimes Plyr kept a wrong muted value into localStorage (i.e. muted = false)
        // @see https://github.com/sampotts/plyr/issues/838#issuecomment-962596150
        player!.muted = true
        player!.play()
      }

      emit('ready')
    }

    function updatePlayerSize() {
      const element = rootElement.value || playerElement.value
      // for now, it handles cover size only
      const mediaWidth = 640 // props.document?.thumbnail?.imageWidth || props.document?.imageWidth
      const mediaHeight = 360 // props.document?.thumbnail?.imageHeight || props.document?.imageHeight
      const ratio = mediaWidth && mediaHeight ? parseFloat(mediaWidth) / parseFloat(mediaHeight) : 16 / 9
      const width = (element?.clientWidth || 0) + 2 // + 2 for hiding a potential antialiasing issue
      const height = (element?.clientHeight || 0) + 2
      const boundsRatio = width / height

      if (boundsRatio < ratio) {
        playerSize.value = [height * ratio, height]
      } else {
        playerSize.value = [width, width * ratio]
      }
    }

    function getUrl(src?: string): string | undefined {
      return src
      // return src && !src.startsWith('http') && !src.startsWith('/') ? useDocumentUrl(src) : src
    }

    watch(hadInteraction, () => {
      if (!hadInteraction.value) return

      nextTick(createPlayer)
    })

    onMounted(() => {
      if (playerElement.value) createPlayer()
    })

    onBeforeUnmount(() => {
      player?.destroy()
      player = null
      window?.removeEventListener('resize', updatePlayerSize)
    })

    // RENDER
    return () => {
      const children: VNode[] = []
      const data: Record<string, unknown> = {
        class: classNames.value,
        ref: rootElement,
      }

      const iframe =
        shouldAppendPlayerContent.value &&
        isEmbed.value &&
        h('iframe', {
          src: embedSrc.value,
          allowfullscreen: '',
          allowtransparency: '',
          allow: 'autoplay',
          class: $style.iframe,
        })
      const playerChild =
        iframe &&
        h(
          'div',
          {
            ref: playerElement,
            style: playerStyle.value,
          },
          [iframe],
        )
      const video =
        shouldAppendPlayerContent.value &&
        !isEmbed.value &&
        h(
          'video',
          {
            playsinline: (props.playsinline || props.background) && '',
            controls: props.controls && !props.background && '',
            muted: (props.muted || props.background) && '',
            loop: (props.loop || props.background) && '',
            autoplay: (props.autoplay || props.background) && '',
            ref: playerElement,
            class: $style.video,
          },
          [
            h('source', {
              src: getUrl(props.src),
              type: props?.document?.mimeType || 'video/mp4',
            }),
          ],
        )

      if (!props.wrapper) {
        if (playerChild) return playerChild
        else if (video) return video
      }

      if (playerChild) children.push(playerChild)
      if (video) children.push(video)

      return h(typeof props.wrapper === 'string' ? props.wrapper : 'div', data, children)
    }
  },
})
</script>

<style lang="scss" module>
.root {
  &--poster {
    position: relative;
  }

  &--cover {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
}

.poster {
  position: relative;
  width: var(--v-video-poster-width, auto);
  height: var(--v-video-poster-height, auto);

  &--cover {
    --v-video-poster-width: 100%;
    --v-video-poster-height: 100%;
  }

  .root--player & {
    visibility: hidden;
  }
}

.image picture {
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(#000, 0.1);
    content: '';
  }
}

:global(.plyr__controls) {
  padding: 10px 22px !important;
  border-radius: 100vmax !important;
  margin: rem(16) rem(24);

  input[type='range']::-webkit-slider-thumb {
    opacity: 0;
  }
}

:global(.plyr__volume) {
  width: inherit;
  min-width: inherit;
}

:global(.plyr__controls__item):not(:first-child) {
  margin-left: rem(10) !important;
}

:global(.plyr) {
  --plyr-video-background: transparent;
  --plyr-video-controls-background: #{rgba(color(black), 0.8)};
  --plyr-video-progress-buffered-background: #{rgba(255, 255, 255, 0.3)};
  --plyr-range-fill-background: '#fff';
  --plyr-control-radius: 100%;
  --plyr-video-control-background-hover: #{rgba(color(white), 0.05)};
  --plyr-video-control-color-hover: #{color(white)};
  --plyr-control-icon-size: 24px;
  --plyr-range-track-height: 3px;

  [data-plyr='play'] svg:not(:first-child) {
    transform: translateX(1px);
  }

  .root--poster & {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .root--cover & {
    width: 100%;
    height: 100%;
  }

  .root--embed.root--cover & {
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: none;
    transform: translate(-50%, -50%);
  }
}

.iframe {
  border: 0;
}

.video {
  .root--poster & {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .root--cover & {
    object-fit: cover;
  }
}
</style>
