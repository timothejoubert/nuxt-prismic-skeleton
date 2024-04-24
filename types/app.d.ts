import type {PrismicDocument} from "@prismicio/types";

export type Theme = 'dark' | 'light'

export interface PageProps<T extends PrismicDocument> {
    prismicDocument: T
}
