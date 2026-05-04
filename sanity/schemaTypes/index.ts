import { type SchemaTypeDefinition } from 'sanity'
import { serviceType } from './serviceType'
import { whyUsType } from './whyUsType'
import { projectType } from './projectType'
import { authorType } from './author'
import { categoryType } from './category'
import { tagType } from './tag'
import { postType } from './post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [serviceType, whyUsType, projectType, authorType, categoryType, tagType, postType],
}
