import type { PrismicDocument } from "@prismicio/client";
import type { ReachableDocument, ReachableDocumentType } from "~/types/prismic";

export type PageContent = ReachableDocument["data"];

export async function useFetchPage<T extends PrismicDocument>() {
    const prismic = usePrismic();
    const route = useRoute();
    const uidParams = route.params.uid;
    const uid = Array.isArray(uidParams) ? uidParams.at(-1) : uidParams;
    const key = `fetch-page-${uid}`;

    const projectPath = useRuntimeConfig().public.projectPath;
    const isProject =
        route.fullPath.includes(projectPath) && route.path !== projectPath;

    // TODO: use getCachedData() into the useAsyncData() options (not released yet) instead of this
    // const cachedData = useNuxtData(key)
    const cachedData = { data: ref(null) };
    const { data } = cachedData.data?.value
        ? cachedData
        : await useAsyncData(key, async () => {
              try {
                  const response = await prismic.client.getByUID(
                      (isProject ? "project" : "page") as ReachableDocumentType,
                      !uid ? "home" : uid,
                  );
                  // TODO: fetch page or project page by UID

                  // const alternateLinks: unknown[] = []; // getResponseAlternateLinks(response);
                  return {
                      // alternateLinks,
                      webResponse: response,
                  };
              } catch (error) {
                  console.error("error=", error, uid);

                  throw createError({
                      statusCode: 404,
                      message: "Page or project not found in useFetchPage",
                  });
                  // clearError({ redirect: "/" });
                  // return { error };
              }
          });

    const webResponse = data.value?.webResponse as T | undefined;
    const itemData = webResponse?.data as PageContent;
    const title = itemData?.title || webResponse?.uid;

    return {
        // alternateLinks: [],
        webResponse,
        itemData,
        title,
        // error: data.value?.error,
    };
}
