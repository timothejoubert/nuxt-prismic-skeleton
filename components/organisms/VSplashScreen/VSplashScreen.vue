<script lang="ts" setup>
const START_VALUE = 0
const LAST_VALUE = 100

const startDelay = 200
const counterDuration = 1200
const leaveDuration = 600

const state = useSplashScreenState()
const counterOutput = ref(0)

function startLoading() {
    window.setTimeout(() => {
        state.value = 'beforeEnter'
    }, startDelay)
}

onMounted(startLoading)
watch(state, (value) => {
    if (value === 'beforeEnter') {
        startCounter()
    }
    else if (value === 'beforeLeaved') {
        state.value = 'leave'
    }
    else if (value === 'leave') {
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
        }
        else {
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
    <div :class="rootClasses">
        <div>{{ counterOutput }}%</div>
    </div>
</template>

<style lang="scss" module>
.root {
  position: absolute;
  z-index: 1001;
  display: flex;
  height: 100svh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: color(white);
  inset: 0;
}
</style>
