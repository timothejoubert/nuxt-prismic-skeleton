<script setup lang="ts"></script>

<template>
  <NuxtStory>
    <NuxtStoryVariant title="Outlined">
      <VStoryThemeProvider>
        <VButton label="Button outlined" outlined />
        <VButton outlined label="Button with icon" icon-name="arrow-right" />
        <VButton outlined icon-name="arrow-right" />
      </VStoryThemeProvider>
    </NuxtStoryVariant>

    <NuxtStoryVariant title="Filled">
      <VStoryThemeProvider>
        <VButton label="Button dark theme" filled />
        <VButton label="Button icon" filled icon-name="arrow-right" />
        <VButton filled icon-name="arrow-right" />
      </VStoryThemeProvider>
    </NuxtStoryVariant>

    <NuxtStoryVariant title="Disabled">
      <VStoryThemeProvider>
        <VButton label="Button disabled" outlined disabled />
        <VButton label="Button disabled" filled disabled />
        <VButton label="Button disabled" disabled />
      </VStoryThemeProvider>
    </NuxtStoryVariant>

    <NuxtStoryVariant title="Sizes">
      <VButton label="Button S" outlined size="xs" />
      <VButton label="Button S" outlined size="s" />
      <VButton label="Button M" outlined size="m" />
      <VButton label="Button L" outlined size="l" />
      <VButton label="Button XL" outlined size="xl" />
    </NuxtStoryVariant>

    <NuxtStoryVariant title="Theme Provider">
      <VStoryThemeProvider>
        <VButton label="Button filled" filled icon-name="arrow-right" />
        <VButton label="Button outlined" outlined />
        <VButton label="Static prop light" theme="light" filled />
        <VButton label="Static prop dark" theme="dark" filled />
      </VStoryThemeProvider>
    </NuxtStoryVariant>
  </NuxtStory>
</template>
