import type { ProjectDocument } from '~/prismicio-types'

export function parseProjectDocumentData(document: ProjectDocument | undefined) {
    if (!document) return { title: undefined, year: undefined, tags: undefined, url: undefined, media: undefined }
    const { data } = document

    return {
        projectTitle: data.title,
        projectYear: data.creation, // TODO: Get year from full date format
        projectTags: document.tags,
        projectUrl: document.url,
        projectMedia: data.main_media,
    }
}
