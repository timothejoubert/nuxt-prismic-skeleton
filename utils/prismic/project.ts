import { getProjectYear } from '~/utils/date'
import type { ProjectPageDocument } from '~/prismicio-types'

export function getCardProjectProps(project: ProjectPageDocument) {
  const { main_media, title, creation_date, description } = project.data

  return {
    id: project.id,
    image: main_media,
    title,
    description,
    tags: project.tags,
    date: getProjectYear(creation_date),
  }
}
