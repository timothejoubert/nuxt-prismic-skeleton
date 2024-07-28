<script setup lang="ts">
import type { ErrorPageDocument } from '~/prismicio-types'
import { DocumentType } from '~/constants/document-type'

type PageError = {
    error: {
        url?: string
        statusCode?: number
        statusMessage?: string
        message?: string
        description?: string
        data?: any
        stack?: any
    }
}

const props = defineProps<PageError>()

const { prismicDocumentData, pageData, alternateLinks } = await useFetchPage<ErrorPageDocument>(DocumentType.ERROR_PAGE)

usePage({
    webResponse: prismicDocumentData,
    alternateLinks,
    title: pageData.meta_title || pageData.title || prismicDocumentData.uid || '',
})

const title = computed(() => {
    if (props.error.statusCode === 404) return pageData.title || 'Fallback title'
    return 'Oups, une erreur est survenue'
})

const message = computed(() => {
    if (props.error.statusCode === 404) return pageData.content || 'Fallback message'
    return 'Le développeur qui à fait le site est vraiment mauvais...'
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
    <NuxtLayout name="default">
        <section :class="$style.root">
            <div>
                <div class="text-body-l">
                    {{ $t('error.status_code', { number: error.statusCode }) }}
                </div>
                <h1
                    class="text-h3"
                    :class="$style.title"
                >
                    {{ title }}
                </h1>
                <VText
                    :class="$style.message"
                    :content="message"
                />
            </div>
            <pre>{{ error }}</pre>
            <div v-html="error?.stack" />
            <VButton
                :label="$t('back_home')"
                theme="dark"
                filled
                outlined
                icon-name="arrow-right"
                @click="handleError"
            />
        </section>
    </NuxtLayout>
</template>

<style lang="scss" module>
.root {
  position: relative;
  max-width: rem(800);
  min-height: calc(100vh - 200px);
  margin-inline: auto;
  padding-block: rem(200) rem(40);
}

.title {
  margin-bottom: rem(20);
}

.message {
  margin-bottom: rem(80);
}
</style>
