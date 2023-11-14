import type { PrismicDocumentWithoutUID, PrismicDocument, PrismicDocumentWithUID } from '@prismicio/types'
import type {AllDocumentTypes, MenuDocument, PageDocument, ProjectDocument} from '~~/prismicio-types'

// Document data
export type DocumentWithUid = IntersectDocument<AllDocumentTypes, PrismicDocumentWithUID>
export type ReachableDocument = PageDocument | ProjectDocument // ExcludeDocument<DocumentWithUid, MenuDocument>

// Document type
export type DocumentType = ExtractDocumentType<AllDocumentTypes>
export type DocumentWithUidType = ExtractDocumentType<DocumentWithUid>
export type DocumentWithoutUidType = ExtractDocumentType<IntersectDocument<AllDocumentTypes, PrismicDocumentWithoutUID>>
export type ReachableDocumentType = ExtractDocumentType<ReachableDocument>

//  UTILS
type ExtractDocumentType<T extends PrismicDocument> = Pick<T, 'type'>['type']
type IntersectDocument<T extends PrismicDocument, FilterType extends PrismicDocument> = T extends FilterType ? T : never
type ExcludeDocument<T extends PrismicDocument, FilterType extends PrismicDocument> = T extends FilterType ? never : T
