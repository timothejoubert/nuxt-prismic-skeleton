<script lang="ts" setup>
import cssGrid from '~/assets/scss/export/_grid.module.scss'
import { getBreakpointValue } from '~/utils/breakpoint/get-breakpoint-value'

type PossibleBreakpoint = '0' | 'lg' | string

interface GridData {
    columns?: Record<PossibleBreakpoint, string>
    gutters?: Record<PossibleBreakpoint, string>
}

const grid = Object.entries(cssGrid).reduce((acc: GridData, [key, value]) => {
    const isColumn = key.includes('grid-column-')
    const isGutter = key.includes('grid-gutter-')
    const breakpoint = key.substring(key.lastIndexOf('-') + 1)

    if (isColumn) {
        if (!acc?.columns) Object.assign(acc, { columns: { [breakpoint]: value } })
        else Object.assign(acc.columns, { [breakpoint]: value })
    } else if (isGutter) {
        if (!acc?.gutters) Object.assign(acc, { gutters: { [breakpoint]: value } })
        else Object.assign(acc.gutters, { [breakpoint]: value })
    }

    return acc
}, {})

const isMoreThanLg = useWindowBreakpoint((width: number) => width > getBreakpointValue('lg'))

const columns = computed(() => parseInt(grid.columns?.[isMoreThanLg ? 'lg' : '0'] || '14'))

const visible = ref(true)
let keys = ''

function onKeyDown(event: KeyboardEvent) {
    keys += event.key
    if (keys.includes('grid')) {
        keys = ''
        visible.value = !visible.value
    }
}

useEventListener('keydown', onKeyDown)
</script>

<template>
    <div v-show="visible" :class="$style.root" class="grid">
        <div v-for="column in columns" :key="column" :class="$style.column"></div>
    </div>
</template>

<style lang="scss" module>
.root {
    position: fixed;
    height: 100vh;
    pointer-events: none;
    user-select: none;
}

.column {
    background-color: #f00;
    opacity: 0.15;
}
</style>
