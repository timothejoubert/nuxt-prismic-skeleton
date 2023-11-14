import type { PrismicDocument } from "@prismicio/client";
import { joinURL } from "ufo";
import type { Link } from "@unhead/schema";
import type { AlternateLanguage } from "@prismicio/client/src/types/value/document";
import type {
    CommonContent,
    CommonContentMenus,
    MenuUid,
} from "~/composables/use-common-content";
import type { MenuDocument } from "~/prismicio-types";

function initCommonContent() {
    const { client } = usePrismic();

    return useAsyncData<CommonContent>("common_content", async () => {
        const menusResponse = await client.getAllByType("menu");
        const setting = await client.getSingle("settings");

        const menus = menusResponse.reduce(
            (acc: Partial<CommonContentMenus>, current: MenuDocument) => {
                const menuUid = current.uid as MenuUid;

                if (!acc?.[menuUid]) acc[menuUid] = current;

                return acc;
            },
            {},
        ) as CommonContentMenus;

        return { menus, setting };
    });
}

function initHead(
    document?: PrismicDocument,
    alternateLinks?: AlternateLanguage[],
) {
    const route = useRoute();
    const runtimeConfig = useRuntimeConfig();
    const link: Link[] = [
        {
            rel: "canonical",
            href: joinURL(
                runtimeConfig.public.baseURL,
                document?.url || route.path,
            ),
        },
    ];

    // ALTERNATE LINKS
    const alternateLinksHead = alternateLinks?.map(
        (alternateLink: AlternateLanguage) => {
            return {
                hid: `alternate-${alternateLink.lang}`,
                rel: "alternate",
                hreflang: alternateLink.lang,
                href: joinURL(
                    runtimeConfig.public.baseURL,
                    alternateLink.uid || alternateLink.lang,
                ),
            };
        },
    );
    if (alternateLinksHead) link.push(...alternateLinksHead);

    const nuxtApp = useNuxtApp();
    const locale = runtimeConfig.public.availableLocales?.length
        ? (nuxtApp?.$i18n as any).locale.value
        : runtimeConfig.public.defaultLocale;
    if (!locale) console.warn("$i18n plugin not setup in init.ts plugin");

    useHead({
        htmlAttrs: {
            lang: locale || "fr",
        },
        link,
        meta: [
            // app version
            { name: "version", content: runtimeConfig.public.version },
        ],
    });
}
//
// function initSeoMeta(webResponse?: RoadizWebResponse) {
//     const nuxtApp = useNuxtApp()
//     const { commonContent } = useCommonContent()
//     const runtimeConfig = useRuntimeConfig()
//     const head = webResponse?.head
//     const description = webResponse?.head?.metaDescription || commonContent.value?.head?.metaDescription
//     const title = webResponse?.head?.metaTitle || commonContent.value?.head?.metaTitle
//     const siteName = commonContent.value?.head?.siteName || (nuxtApp.$config.siteName as string) || ''
//     const { isActive: previewIsActive } = usePreview()
//     const img = useImage()
//     const image = () => {
//         const image =
//             head?.shareImage?.relativePath ||
//             // @ts-ignore not sure the `images` property exists, but generally it does
//             head?.images?.[0]?.relativePath ||
//             // @ts-ignore not sure the `image` property exists, but generally it does
//             head?.image?.[0]?.relativePath ||
//             commonContent.value?.head?.shareImage?.relativePath
//
//         if (image) {
//             return img(image, {
//                 width: 1200,
//                 quality: 70,
//             })
//         } else {
//             return joinURL(runtimeConfig.public.baseURL, '/images/share.jpg')
//         }
//     }
//
//     useServerSeoMeta({
//         description,
//         ogTitle: title,
//         ogSiteName: siteName,
//         ogDescription: description,
//         ogImage: image(),
//         twitterCard: 'summary',
//         twitterTitle: title,
//         twitterDescription: description,
//         robots: {
//             noindex: (webResponse?.item as RoadizNodesSources)?.noIndex || previewIsActive.value,
//         },
//     })
// }

export default defineNuxtPlugin(async () => {
    // initPreview()
    await initCommonContent();

    // const route = useRoute()
    // const isWildCardRoute = route.name === 'slug'
    // const page = isWildCardRoute ? await useFetchPage() : undefined

    // if (page) await initI18n(page?.locale)
    // initHead(page?.webResponse, page?.alternateLinks)
    // initSeoMeta(page?.webResponse)
});
