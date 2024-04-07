import type {
  LinkField,
  PrismicDocument,
  FilledContentRelationshipField,
  FilledLinkToWebField,
  FilledLinkToMediaField,
} from '@prismicio/types'
import { LinkType } from '@prismicio/types'
import { isObject } from '~/utils/object/is-object'
import { objectHasAllKeys } from '~/utils/object/object-has-all-keys'

export function isDocumentEntity(entity: unknown): entity is PrismicDocument {
  return isObject(entity) && objectHasAllKeys(entity, ['id', 'type', 'last_publication_date', 'tags', 'lang'])
}

export function isLinkField(entity: unknown): entity is LinkField {
  return (
    isObject(entity) &&
    objectHasAllKeys(entity, ['link_type']) &&
    Object.values(LinkType).includes(entity.link_type as any)
  )
}

export function isContentRelationshipField(entity: unknown): entity is FilledContentRelationshipField {
  return isLinkField(entity) && objectHasAllKeys(entity, ['id', 'type', 'tags', 'lang'])
}
export function isFilledLinkToWebField(entity: unknown): entity is FilledLinkToWebField {
  return isLinkField(entity) && objectHasAllKeys(entity, ['url'])
}
export function isLinkToMediaField(entity: unknown): entity is FilledLinkToMediaField {
  return isLinkField(entity) && objectHasAllKeys(entity, ['name', 'kind', 'url', 'size'])
}
