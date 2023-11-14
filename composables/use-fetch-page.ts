import type { PrismicDocument } from "@prismicio/client";
import type { ReachableDocument, ReachableDocumentType } from "~/types/prismic";

export type PageContent = ReachableDocument["data"];

export async function useFetchPage<T extends PrismicDocument>() {
    const prismic = usePrismic();
    const route = useRoute();
    const path = route.path.replace("/", "");
    const key = `fetch-page-${path}`;

    console.log(path);
    // TODO: use getCachedData() into the useAsyncData() options (not released yet) instead of this
    // const cachedData = useNuxtData(key)
    const cachedData = { data: ref(null) };
    const { data } = cachedData.data?.value
        ? cachedData
        : await useAsyncData(key, async () => {
              try {
                  const response = await prismic.client.getByUID(
                      "page" as ReachableDocumentType,
                      !path || path === "/" ? "home" : path,
                  );

                  // [prismic.predicates.at('document.type', ['page', 'project']), prismic.predicates.at('my.doctype1.uid', path === "/" ? "home" : path)],
                  // const alternateLinks: unknown[] = []; // getResponseAlternateLinks(response);

                  return {
                      // alternateLinks,
                      webResponse: response,
                  };
              } catch (error) {
                  console.error("error=", error, path);

                  clearError({ redirect: "/" });

                  return { error };
              }
          });

    const webResponse = data.value?.webResponse as T | undefined;
    const itemData = webResponse?.data;
    const title = itemData?.title || webResponse?.uid;

    return {
        // alternateLinks: [],
        webResponse,
        itemData,
        title,
        error: data.value?.error,
    };
}
