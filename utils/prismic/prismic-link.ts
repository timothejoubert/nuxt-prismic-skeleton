import type {LinkToMediaField, LinkField } from "@prismicio/client";
import type {FilledLinkToWebField} from "@prismicio/client/src/types/value/link";
import type {ContentRelationshipField} from "@prismicio/client/src/types/value/contentRelationship";




export function getLinkFieldFilled(link: LinkField | undefined) {
    if (!link) return

    if (link.link_type === 'Document') {
        return getLinkToRelationFieldFilled(link)
    } else if (link.link_type === 'Media') {
        return getLinkToMediaFieldFilled(link)
    } else if (link.link_type === 'Web') {
        return getLinkToWebFieldFilled(link)
    }
}

export function getLinkToRelationFieldFilled(relation: ContentRelationshipField | undefined) {
    if (!relation) return

    const filledRelation = relation as ContentRelationshipField<'filled'>
    if (!filledRelation?.id) {
        console.warn(`LinkToRelation is empty`)
        return
    }

    return filledRelation as ContentRelationshipField<'filled'>
}

export function getLinkToWebFieldFilled(externalLink: FilledLinkToWebField | undefined) {
    if (!externalLink) return

    const filledExternalLink = externalLink as FilledLinkToWebField<'filled'>
    if (!filledExternalLink?.url) {
        console.warn(`LinkToWeb is empty`)
        return
    }

    return filledExternalLink
}

export function getLinkToMediaFieldFilled(media: LinkToMediaField | undefined) {
    if (!media) return

    const filledFile = media as LinkToMediaField<'filled'>
    if (!filledFile?.url) {
        console.warn(`LinkToMedia is empty`)
        return
    }

    return filledFile
}
