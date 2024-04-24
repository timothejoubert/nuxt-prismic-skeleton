<script lang="ts" setup>
const START_VALUE = 0
const LAST_VALUE = 100

const startDelay = 200
const counterDuration = 1200
const leaveDuration = 600

const state = useSplashScreenState()

const counterOutput = ref(0)

onMounted(() => {
  window.setTimeout(() => {
    state.value = 'beforeEnter'
  }, startDelay)
})

watch(state, (value) => {
  if (value === 'beforeEnter') {
    startCounter()
  } else if (value === 'beforeLeaved') {
    state.value = 'leave'
  } else if (value === 'leave') {
    window.setTimeout(() => {
      state.value = 'done'
    }, leaveDuration)
  }
})

// Utils
function startCounter() {
  let startTimestamp: null | number = null

  const increaseCounter = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp

    const progress = Math.min((timestamp - startTimestamp) / counterDuration, 1)

    counterOutput.value = Math.floor(progress * (LAST_VALUE - START_VALUE) + START_VALUE)

    if (progress < 1) {
      window.requestAnimationFrame(increaseCounter)
    } else {
      state.value = 'beforeLeaved'
    }
  }

  window.requestAnimationFrame(increaseCounter)
}

// Style
const $style = useCssModule()
const rootClasses = computed(() => {
  return [
    $style.root,
    state.value !== 'pending' && $style['root--started'],
    state.value === 'beforeLeaved' && $style['root--before-leave'],
    state.value === 'leave' && $style['root--leave'],
  ]
})
</script>

<template>
  <div :class="rootClasses" :style="{ '--loading-percent': counterOutput / 100 }" class="container--fullwidth">
    <div :class="$style.logos">
      <div :class="[$style.logo, $style['logo--skeleton']]"></div>
      <div :class="[$style.logo, $style['logo--bg']]" />
      <svg width="0" height="0">
        <title>Logotype loading hugo tomasi</title>
        <clipPath id="logoPath">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M51.648 76.0075L54.0337 72.6775L54.0337 8.19416L51.9678 4.99057L41.2225 0.123901L37.4102 0.721341L1.15545 33.5713L2.14577e-06 36.1775L0 43.4775L1.15545 46.0836L37.4102 78.9336L40.9027 79.6575L51.648 76.0075ZM50.5169 8.19416L39.7716 3.32749L31.5168 10.807V68.848L39.7716 76.3275L50.5169 72.6775L50.5169 8.19416Z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M62.5447 74.4403L60.4874 71.2406L60.4874 6.96565L62.8659 3.63816L73.5 -4.68641e-05L77.0091 0.729736L84.7965 7.83651L85.9426 10.4342L85.9426 68.9848L84.7965 71.5825L77.0091 78.6893L73.1788 79.2913L62.5447 74.4403ZM74.6384 76.0916L64.0043 71.2407L64.0043 6.96565L74.6384 3.32744L82.4258 10.4342L82.4258 68.9848L74.6384 76.0916Z"
          />
        </clipPath>
      </svg>
    </div>
    <VHeaderBottom
      :class="$style.bottom"
      title="Loading"
      content-class="text-h5"
      :content="counterOutput + '%'"
      loading
    />
  </div>
</template>

<style lang="scss" module>
.root {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  height: 100svh;
  inset: 0;
  color: color(white);

  &::before {
    position: absolute;
    background-color: color(black);
    content: '';
    inset: 0;
    z-index: -1;
  }
}

.logos {
  position: absolute;
  display: flex;
  width: 86px;
  align-items: center;
  justify-content: center;
  aspect-ratio: 86 / 80;
  clip-path: url(#logoPath);
}

@keyframes loading-animation {
  100% {
    background-position: -480% 480%;
  }
}

.logo {
  --loading-color: rgba(255, 255, 255, 0.4);

  position: relative;
  width: 100%;
  height: 100%;

  &--skeleton {
    animation: loading-animation 1s infinite ease(in-out-circ);
    background-color: rgba(58, 58, 58, 0.4);
    background-image: linear-gradient(
      to right,
      transparent 0%,
      var(--loading-color) 10%,
      var(--loading-color) 20%,
      transparent 30%
    );
    background-position: 120% 0;
    background-size: 120% 100%;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
      background: none;
    }

    z-index: 3;
  }

  &--bg {
    position: absolute;
    top: 0;
    left: 0;
    background-color: color(white);
    opacity: clamp(0.1, var(--loading-percent, 0), 1);
  }
}

.bottom {
  margin-top: auto;
  width: 100%;
}

.over-title {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  margin-bottom: rem(16);
  gap: rem(4);
}

.percent-bar {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 1px;
  background-color: rgba(color(white), 0.3);

  &::after {
    position: absolute;
    background-color: color(white);
    content: '';
    inset: 0;
    opacity: 0.6;
    scale: var(--loading-percent, 0) 1;
    transform-origin: left;
    transition: scale 0.2s;
  }
}

.counter {
  position: relative;
  margin-top: rem(12);
  opacity: 0;
  transition: opacity 0.2s ease(out-quad);

  .root--started & {
    opacity: 0.8;
  }
}

.over-title,
.percent-bar {
  opacity: 0;
  transition: opacity 0.2s ease(out-quad);

  .root--started & {
    opacity: 1;
  }
}
</style>
