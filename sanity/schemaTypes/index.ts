import { type SchemaTypeDefinition } from 'sanity'

import { eventSchema } from './event'
import { blogSchema } from './blog'
import { academyItemSchema } from './academyItem'
import { storeProductSchema } from './storeProduct'
import { teamMemberSchema } from './teamMember'
import campaignEmailSchema from './campaignEmail'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventSchema, blogSchema, academyItemSchema, storeProductSchema, teamMemberSchema, campaignEmailSchema],
}
