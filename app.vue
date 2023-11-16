<script setup lang="ts"></script>

<template>
    <div>
        <VTopBar />
        <NuxtPage />
        <NuxtLoadingIndicator :height="200" color="red" :duration="10000" />
        <VFooter />
    </div>
</template>
