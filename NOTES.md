### Prismic type in generated ts

```` javascript
import type * as prismic from '@prismicio/types'
import { ApiOptions } from '@prismicio/client/types/Api'
import { Document } from '@prismicio/client/types/documents'

(repositoryNameOrEndpoint: string, options?: ApiOptions): Promise<Document<AllDocumentTypes>>
````


### IN PROGRESS

### TO CHECK

### TODOS

### DONE

### LATER 
* **(Route)** Set relationLink field in BO if we want nested route (projects/project-name)
* **(Build)** Generate.exclude not working
* **(Sitemap && routes)** avoid to generate route for ['/preview', '/en/preview', '/en/slice-simulator', '/slice-simulator']
* **(Nav)**: Configure nested route
* **(Config)** check if I can make Internalization route path (update documentUid vars by currentLocale ?)
* **(Prismic)** use new Page type
* **(Config)** use PrismicClient (exemple)[https://community.prismic.io/t/an-invalid-prismic-repository-name-was-given/10523/10]

### ABANDONED
