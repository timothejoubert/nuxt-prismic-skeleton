import type { PrismicDocument } from "@prismicio/client";
import { useNextPage } from "~/composables/use-next-page";
import { useCurrentPage } from "~/composables/use-current-page";

export interface Page {
    title?: string;
    webResponse?: PrismicDocument;
    // alternateLinks?: RoadizAlternateLink[];
}

interface UsePageOptions extends Page {}

export function usePage(options?: UsePageOptions) {
    const nextPage = useNextPage();
    const currentPage = useCurrentPage();

    nextPage.value = {
        title: options?.title,
        webResponse: options?.webResponse,
        // alternateLinks: options?.alternateLinks,
    };

    function onPageTransitionEnter() {
        currentPage.value = { ...nextPage.value };
    }

    watch(currentPage, () => {
        useHead({
            title: currentPage.value?.title,
        });

        // useAlternateLinks(currentPage.value.alternateLinks);
    });

    onBeforeMount(() => {
        useEvent({
            id: "pageTransitionEnter",
            type: "on",
            callback: onPageTransitionEnter,
        });
    });

    onBeforeUnmount(() => {
        useEvent({
            id: "pageTransitionEnter",
            type: "off",
        });
    });
}
