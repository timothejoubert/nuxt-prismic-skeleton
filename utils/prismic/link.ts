import type { LinkField, PrismicDocument } from '@prismicio/types'
import type {
    ContentRelationshipField,
    FilledContentRelationshipField,
} from '@prismicio/types/src/value/contentRelationship'
import type { FilledLinkToWebField } from '@prismicio/types/src/value/link'
import type { FilledLinkToMediaField, LinkToMediaField } from '@prismicio/types/src/value/linkToMedia'
import type { ReachableDocument, ReachableDocumentType } from '~/types/prismic'

// Document Field
function getPrismicDocumentLinkProps(document: PrismicDocument) {
    return {
        url: document?.url || document?.uid || '/',
        label: document.data?.title || 'default PrismicLink label',
    }
}

// Web Link Field
function getWebLinkProps(field: LinkToMediaField) {
    const filledField = getFilledLinkField(field) as FilledLinkToWebField

    return {
        url: filledField.url,
        target: filledField.target,
        label: filledField.url,
    }
}

// Relation Field
function getPrismicRelationFieldProps(field: ContentRelationshipField) {
    const filledField = getFilledLinkField(field) as FilledContentRelationshipField<
        ReachableDocumentType,
        string,
        ReachableDocument['data']
    >

    return {
        url: filledField.url || filledField.uid,
        label: filledField.data?.title || filledField.uid,
    }
}

// Type guard
type FilledLinkFields = FilledContentRelationshipField | FilledLinkToWebField | FilledLinkToMediaField

function getFilledLinkField(field: LinkField): FilledLinkFields | undefined {
    const anyField = field as any // UnionToIntersection<FilledLinkFields>

    const hasFilledKey = anyField?.url || anyField?.id || anyField?.link_type === 'Media' // Web | Relation | Media
    return hasFilledKey ? (field as FilledLinkFields) : undefined
}

export function getPrismicLinkFieldProps(field: LinkField) {
    const filledField = getFilledLinkField(field)

    if (!filledField) {
        console.warn(`${field} is not filled`)
        return { url: '', label: '' }
    }

    if (field.link_type === 'Web') {
        return getWebLinkProps(filledField)
    } else if (field.link_type === 'Document') {
        return getPrismicRelationFieldProps(field)
    } else if (field.link_type === 'Media') {
        console.warn(`getPrismicLinkFieldToProps(): ${field} detect Media type`)
    } else {
        console.warn(`getPrismicLinkFieldToProps(): ${field} failed to find type`)
    }
}

// From all fields
const pageType: (ReachableDocumentType | string)[] = ['page', 'project']

function isRelationField(prismicData: Object & Partial<LinkField>): prismicData is LinkField {
    return !!prismicData?.link_type
}

function isPrismicDocument(prismicData: Object & PrismicDocument): prismicData is PrismicDocument {
    return !!(prismicData?.id && prismicData?.type && prismicData?.href)
}

function isPrismicDocumentReachable(prismicData: Object & PrismicDocument) {
    return isPrismicDocument(prismicData) && pageType.includes(prismicData.type)
}

export function getPrismicLinkProps(prismicData: PrismicDocument | LinkField) {
    if (isRelationField(prismicData)) return getPrismicLinkFieldProps(prismicData)
    else if (isPrismicDocumentReachable(prismicData)) return getPrismicDocumentLinkProps(prismicData)
}
