<script setup lang="ts">
// import type { NuxtError } from "#app";

defineProps({
    error: Object, // NuxtError,
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
    <div>
        <div class="text-h1">page error</div>
        <h2>{{ error?.statusCode }}</h2>
        <button @click="handleError">Clear errors</button>
    </div>
</template>
