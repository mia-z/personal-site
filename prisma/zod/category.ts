import * as z from "zod"
import { CompletePost, RelatedPostModal } from "./index"

export const CategoryModal = z.object({
  id: z.number().int(),
  categoryName: z.string(),
})

export interface CompleteCategory extends z.infer<typeof CategoryModal> {
  posts: CompletePost[]
}

/**
 * RelatedCategoryModal contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCategoryModal: z.ZodSchema<CompleteCategory> = z.lazy(() => CategoryModal.extend({
  posts: RelatedPostModal.array(),
}))
