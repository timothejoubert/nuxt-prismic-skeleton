import { LinkType } from '@prismicio/types'

// Merge possible Prismic media properties
export interface CustomPrismicMedia {
  // Commons
  id?: string
  url?: string
  // FilledLinkToMediaField
  link_type?: (typeof LinkType)[keyof typeof LinkType]
  name?: string
  kind?: string
  size?: string
  height?: string | null
  width?: string | null
  // FilledImageFieldImage
  dimensions?: { width: number; height: number }
  alt?: string | null
  copyright?: string | null
  edit?: { x: number; y: number; zoom: number; background: string }
}
