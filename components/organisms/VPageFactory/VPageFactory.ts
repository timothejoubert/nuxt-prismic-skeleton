import { resolveDynamicComponent, resolveComponent } from 'vue'
import type { FunctionalComponent, VNodeChild } from 'vue'
import type { PrismicDocument } from '@prismicio/types'
import { DocumentType } from '~/constants/document-type'

interface VPageFactoryProps {
  type: DocumentType
  document: PrismicDocument
}

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

const isComponent = (component: string) => {
  return typeof resolveDynamicComponent(component) !== 'string' || typeof resolveComponent(component) !== 'string'
}

const VPageFactory: FunctionalComponent<VPageFactoryProps> = (props, context): VNodeChild => {
  const componentName = getPageComponentName(props.type)

  if (isComponent(componentName)) {
    return h(resolveComponent(componentName), { prismicDocument: props.document, type: props.type, ...context.attrs })
  } else {
    showError({
      status: 404,
      message: `Aucune composant de page existe pour cette requete: ${props.type} - ${componentName}`,
    })
    return h('')
  }
}

export default VPageFactory
