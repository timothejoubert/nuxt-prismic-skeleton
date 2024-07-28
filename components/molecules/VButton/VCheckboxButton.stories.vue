<template>
    <NuxtStory>
        <VButton
            label="Button label"
            emphasis="secondary"
            icon-last
        >
            <template #icon>
                <input
                    type="checkbox"
                    name="checkbox-button"
                    :class="$style.input"
                >
                <VCheckbox
                    :class="$style.checkbox"
                    checked
                />
            </template>
        </VButton>
    </NuxtStory>
</template>

<style lang="scss" module>
.input {
    position: absolute;
    z-index: 2;
    inset: 0;
    opacity: 0;
}

.checkbox {
    --v-checkbox-size: #{rem(24)};
    --v-checkbox-border-radius: 50%;

    margin-left: rem(4);
}
</style>
