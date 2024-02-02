import type {LinkToMediaField} from "@prismicio/client";

export function parsePrismicLinkDocument(file: LinkToMediaField | undefined) {
    if (!file) return

    const filledFile = file as LinkToMediaField<'filled'>
    if (!filledFile?.url) {
        console.warn(`file type ${file.link_type} is empty`)
        return
    }else {
        return filledFile
    }
}
