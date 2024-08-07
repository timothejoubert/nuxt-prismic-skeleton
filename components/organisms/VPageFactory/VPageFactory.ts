import { resolveDynamicComponent, resolveComponent } from 'vue'
import type { PropType, FunctionalComponent, VNodeChild } from 'vue'
import type { PrismicDocument } from '@prismicio/types'
import { DocumentType } from '~/constants/document-type'

function getPageComponentName(type: DocumentType) {
    switch (type) {
        case DocumentType.HOME:
            return 'VHomePage'
        case DocumentType.ABOUT:
            return 'VAboutPage'
        case DocumentType.PROJECT_LISTING:
            return 'VProjectListingPage'
        case DocumentType.PROJECT:
            return 'VProjectPage'
        case DocumentType.WEB_PAGE:
            return 'VDefaultPage'
        default:
            return 'VErrorPage'
    }
}

type DocumentTypeValue = (typeof DocumentType)[keyof typeof DocumentType]

interface VPageFactoryProps {
    type: DocumentTypeValue
    document: PrismicDocument
}

const isComponent = (component: string) => {
    return typeof resolveDynamicComponent(component) !== 'string' || typeof resolveComponent(component) !== 'string'
}

const VPageFactory: FunctionalComponent<VPageFactoryProps> = (props, context): VNodeChild => {
    const componentName = getPageComponentName(props.type)

    if (componentName && isComponent(componentName)) {
        return h(resolveComponent(componentName), {
            prismicDocument: props.document,
            type: props.type,
            ...context.attrs,
        })
    }
    else {
        showError({
            status: 404,
            message: `Aucune composant de page existe pour cette requete: ${props.type} - ${componentName}`,
        })
        return h('')
    }
}

VPageFactory.props = {
    type: String as PropType<DocumentTypeValue>,
    document: Object as PropType<PrismicDocument>,
}

export default VPageFactory
