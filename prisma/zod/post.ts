import * as z from "zod"
import { CompleteTagsOnPost, RelatedTagsOnPostModal, CompleteCategory, RelatedCategoryModal } from "./index"

export const PostModal = z.object({
  id: z.number().int(),
  title: z.string(),
  content: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  published: z.boolean(),
  categoryId: z.number().int(),
})

export interface CompletePost extends z.infer<typeof PostModal> {
  tagsOnPost: CompleteTagsOnPost[]
  category: CompleteCategory
}

/**
 * RelatedPostModal contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPostModal: z.ZodSchema<CompletePost> = z.lazy(() => PostModal.extend({
  tagsOnPost: RelatedTagsOnPostModal.array(),
  category: RelatedCategoryModal,
}))
