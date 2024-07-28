import { createClient } from '@prismicio/client'
import prismicData from '../../../slicemachine.config.json'
import { prismicDocumentRouteList } from '~/utils/prismic/route-resolver'
import { DocumentType } from '~/constants/document-type'

export default defineSitemapEventHandler(async () => {
    const prismic = createClient(prismicData.endpoint, {
        routes: prismicDocumentRouteList,
    })

    const pages = prismic.getAllByType(DocumentType.WEB_PAGE)
    const projects = prismic.getAllByType(DocumentType.PROJECT)
    const documents = await Promise.all([pages, projects])

    const sitemapUrl = documents.flat(2).map((doc) => {
        return {
            loc: doc.url || doc.type,
            lastmod: doc.last_publication_date,
        }
    })

    return sitemapUrl
})
