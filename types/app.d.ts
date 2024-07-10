import type {PrismicDocument} from "@prismicio/types";
import { DocumentType } from '~/constants/document-type'
export type Theme = 'dark' | 'light'

export interface PageProps<T extends PrismicDocument> {
    prismicDocument: T
    type: DocumentType
}
