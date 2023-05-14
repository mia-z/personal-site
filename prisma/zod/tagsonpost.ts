import * as z from "zod"
import { CompletePost, RelatedPostModal, CompleteTag, RelatedTagModal } from "./index"

export const TagsOnPostModal = z.object({
  postId: z.number().int(),
  tagId: z.number().int(),
})

export interface CompleteTagsOnPost extends z.infer<typeof TagsOnPostModal> {
  post: CompletePost
  tag: CompleteTag
}

/**
 * RelatedTagsOnPostModal contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTagsOnPostModal: z.ZodSchema<CompleteTagsOnPost> = z.lazy(() => TagsOnPostModal.extend({
  post: RelatedPostModal,
  tag: RelatedTagModal,
}))
