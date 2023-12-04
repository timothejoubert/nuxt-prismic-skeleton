<script setup lang="ts">
import eventBus from '~/utils/event-bus'
import EventType from '~/constants/event-type'

const preferReduceMotion = usePrefersReducedMotion()

const getMediaQuery = () => window.matchMedia('(prefers-reduced-motion: reduce)')
const setPreferReduceMotion = () => (preferReduceMotion.value = getMediaQuery().matches)

onMounted(() => {
    setPreferReduceMotion()
    getMediaQuery().addEventListener('change', setPreferReduceMotion)
})
onUnmounted(() => getMediaQuery().removeEventListener('change', setPreferReduceMotion))

// First enter
onMounted(() => {
    eventBus.emit(EventType.PAGE_TRANSITION_ENTER)
})
</script>

<template>
    <div>
        <NuxtLoadingIndicator :height="5" color="yellow" />
        <VMainNav />
        <NuxtPage />
        <VFooter />
    </div>
</template>
