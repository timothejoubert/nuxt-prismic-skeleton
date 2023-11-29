import type { PrismicDocumentWithoutUID, PrismicDocument, PrismicDocumentWithUID } from '@prismicio/types'
import type {AllDocumentTypes, MenuDocument, SettingsDocument} from '~~/prismicio-types'

// Document data
export type DocumentWithUid = IntersectDocument<AllDocumentTypes, PrismicDocumentWithUID>
export type ReachableDocument = ExcludeDocument<AllDocumentTypes, (MenuDocument | SettingsDocument)> // ExcludeDocument<DocumentWithUid, MenuDocument> // PageDocument | ProjectDocument

// Document type
export type DocumentType = ExtractDocumentType<AllDocumentTypes>
export type DocumentWithUidType = ExtractDocumentType<DocumentWithUid>
export type DocumentWithoutUidType = ExtractDocumentType<IntersectDocument<AllDocumentTypes, PrismicDocumentWithoutUID>>
export type ReachableDocumentType = ExtractDocumentType<ReachableDocument>

// Page
export type VPageProps<T extends PrismicDocument['data']> = { webResponse: PrismicDocument<T> }


//  UTILS
type ExtractDocumentType<T extends PrismicDocument> = Pick<T, 'type'>['type']
type IntersectDocument<T extends PrismicDocument, FilterType extends PrismicDocument> = T extends FilterType ? T : never
type ExcludeDocument<T extends PrismicDocument, FilterType extends PrismicDocument> = T extends FilterType ? never : T
