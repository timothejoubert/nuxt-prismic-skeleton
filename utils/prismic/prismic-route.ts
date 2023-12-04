import { prismicDocuments } from './prismic-documents'

// Defined in prismic options inside nuxt.config.ts for add specific url on document
// All pages with dedicated content should be a specific document type
// routes: [
//     {
//         type: 'page',
//         uid: 'home',
//         path: '/',
//     },
// ]

export function generatePrismicUrlList() {
    return Object.entries(prismicDocuments).map(([key, value]) => {
        return { type: key, path: value }
    })
}
