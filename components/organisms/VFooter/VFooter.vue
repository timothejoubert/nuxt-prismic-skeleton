<script lang="ts" setup>
import VSocialList from '~/components/molecules/VSocialList/VSocialList.vue'

const { setting } = useCommonContent()

const siteName = computed(() => setting.value?.site_name || 'fallback siteName')
const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
    <footer
        :class="$style.root"
        class="container"
    >
        <div
            class="text-body-xs"
            :class="$style.copyright"
        >
            © {{ siteName }} | {{ currentYear }}
            <div :class="$style.creator">
                <span>{{ $t('created_by') }}</span>
                <a
                    href="https://timothejoubert.com"
                    target="_blank"
                >Timothé J.</a>
            </div>
        </div>
        <VSocialList display-icon />
    </footer>
</template>

<style lang="scss" module>
.root {
  position: relative;
  display: flex;
  height: rem(64);
  justify-content: space-between;
  border-radius: rem(4);
  margin-bottom: rem(24);
  background-color: var(--color-primary-lighter-10);
  padding-inline: rem(24);
}

.copyright {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;

  @include media('>=xs') {
    flex-direction: row;
  }
}

.creator {
  margin-top: rem(6);

  & > * {
    opacity: 0.7;
  }

  & > *:first-child {
    margin-inline: rem(24) rem(4);
  }

  & > a {
    transition: opacity 0.3s;
  }

  & > a:hover {
    opacity: 1;
  }

  @include media('>=xs') {
    margin-top: 0;
  }
}
</style>
