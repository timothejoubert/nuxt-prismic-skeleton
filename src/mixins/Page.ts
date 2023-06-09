import Vue from 'vue'
import type { MetaInfo } from 'vue-meta'
import { Context, NuxtError } from '@nuxt/types'
import { SliceZone } from '@prismicio/types/src/value/sliceZone'
import { FilledLinkToMediaField } from '@prismicio/types/src/value/linkToMedia'
import { FacebookMetaOptions, TwitterMetaOptions } from '~/types/meta'
import { createFacebookMeta } from '~/utils/meta/facebook'
import { createTwitterMeta } from '~/utils/meta/twitter'
import { DocumentPageReachableData } from '~/types/prismic/app-prismic'
import CustomType from '~/constants/custom-type'
import { isHomePageDocument, isProjectListingDocument } from '~/utils/prismic/document-entity'
import { isDefaultPageDocument, isProjectDocument } from '~/utils/prismic/custom-type-entity'
import { isFilledLinkToMediaField } from '~/utils/prismic/field-media'
import { SettingsDocument, ProjectDocumentData } from '~~/prismicio-types'
import { getProjectYear } from '~/utils/prismic/date'

export default Vue.extend({
    nuxtI18n: false,
    async asyncData(context: Context) {
        const { $prismic, params, store, route, error } = context
        let page

        const uid = params.pathMatch
        const isPreview = route.fullPath.includes(`${context.$config.previewPath}/`)
        const isRootPath = route.fullPath === '/en' || route.fullPath === '/'
        const isProject = store.getters.isProjectUid(uid)

        if (isPreview) {
            page = await $prismic.api.getByID(route.params.documentId)
        } else if (isRootPath) {
            page = await $prismic.api.getSingle(CustomType.HOME_PAGE)
        } else if (isProject) {
            page = store.getters.getProjectByUid(uid)
        } else {
            try {
                page = await $prismic.api.getByUID(
                    CustomType.PAGE,
                    uid,
                    route.fullPath.includes('/en') ? { lang: 'en-gb' } : undefined
                )
            } catch (fetchError: Error | any) {
                error({
                    statusCode: fetchError?.response?.status,
                    message: fetchError?.message,
                } as NuxtError)
            }
        }

        if (page) {
            await store.dispatch('updatePageData', page)
            return { page }
        } else {
            return { page: { title: "can't fetch title in Page mixin" } }
        }
    },
    head(): MetaInfo {
        const meta = [
            { hid: 'description', name: 'description', content: this.pageDescription },
            { hid: 'version', name: 'version', content: this.$config.version || '' },
            ...createFacebookMeta(this.getFacebookMetaOptions()),
            ...createTwitterMeta(this.getTwitterMetaOptions()),
        ]

        return {
            htmlAttrs: { lang: this.$i18n?.locale || this.$config.defaultLocale },
            title: this.metaTitle,
            meta,
        }
    },
    computed: {
        pageData(): DocumentPageReachableData {
            return this.page.data
        },
        appTitle(): string {
            return this.$store.state.settings?.data?.site_name || this.$config.appName
        },
        metaTitle(): string {
            if (this.isHome) return this.appTitle
            const pageTitle = this.pageData?.meta_title || (this.pageData as { title?: string })?.title
            return pageTitle ? `${pageTitle} | ${this.appTitle}` : this.appTitle
        },
        pageDescription(): string | undefined {
            return this.pageData?.meta_description || this.$store.state.settings?.data?.description
        },
        metaImage(): string {
            const mediaUrl = (this.pageData?.meta_image as { url?: string })?.url

            return mediaUrl || '/images/share.jpg'
        },
        pageUrl(): string {
            return this.appTitle + this.$route.fullPath.substring(1)
        },
        isHome(): boolean {
            return !!this.page && isHomePageDocument(this.page)
        },
        isProjectListing(): boolean {
            return !!this.page && isProjectListingDocument(this.page)
        },
        isProjectPage(): boolean {
            return !!this.page && isProjectDocument(this.page)
        },
        isDefaultPage(): boolean {
            return !!this.page && isDefaultPageDocument(this.page)
        },
        slices(): SliceZone | [] {
            return !!this.page && this.page.data?.slices
        },
        jsonLd(): Record<string, unknown> | undefined {
            const siteName =
                (this.$store.state.settings as SettingsDocument)?.data?.website_name || this.$config.appName
            const baseUrl = this.$config.appUrl + (this.$i18n.locale === 'en' ? 'en/' : '')
            const websitePersonEntity = {
                name: siteName,
                alternateName: siteName.replace(/\s/g, ''),
                url: baseUrl,
                jobTitle: 'Motion designer',
            }

            if (this.isHome) {
                return {
                    '@context': 'https://schema.org',
                    '@type': 'WebSite',
                    ...websitePersonEntity,
                    author: {
                        '@type': 'Person',
                        givenName: 'Timothé',
                        familyName: 'Joubert',
                        birthDate: '1998-08-24',
                        url: 'https://timothejoubert.com',
                    },
                }
            } else if (this.isProjectPage) {
                const project = this.pageData as ProjectDocumentData
                const optionals: Record<string, unknown> = {}
                const media = (project.thumbnail as { url?: string })?.url

                if (project.title) optionals.name = project.title
                if (media) optionals.image = media
                if (project.content) optionals.description = this.$prismic.asText(project.content)
                if (project.date) optionals.copyrightYear = getProjectYear(project.date)

                return {
                    '@context': 'https://schema.org',
                    '@type': 'VisualArtwork',
                    artform: 'Video',
                    artMedium: 'Digital',
                    creator: {
                        '@type': 'Person',
                        ...websitePersonEntity,
                    },
                    ...optionals,
                }
            } else {
                return undefined
            }
        },
    },
    created() {
        // set the locale for first render on the client side (without asyncData)
        // if (this.page?.lang) this.$i18n.locale = getFormattedLocale(this.page.lang, 'minify')
    },
    methods: {
        getTwitterMetaOptions(): TwitterMetaOptions {
            return {
                title: this.metaTitle,
                description: this.pageDescription,
                url: this.pageUrl,
                image: this.metaImage,
            }
        },
        getFacebookMetaOptions(): FacebookMetaOptions {
            return {
                siteName: this.appTitle,
                title: this.metaTitle,
                description: this.pageDescription,
                url: this.pageUrl,
                image: this.metaImage,
            }
        },
    },
})
