import type { PrismicDocument } from "@prismicio/client";
import type { GroupField } from "@prismicio/types";

export function getDocumentData<
    T extends PrismicDocument,
    K extends keyof T["data"] & string,
>(document: T, key: K): T["data"][K] | undefined {
    return document?.data?.[key];
}

export function formatGroupField<T extends GroupField>(field: T): T[] {
    return field.filter((field) => field);
}
