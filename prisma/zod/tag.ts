import * as z from "zod"
import { CompletePost, RelatedPostModal } from "./index"

export const TagModal = z.object({
  id: z.number().int(),
  text: z.string(),
})

export interface CompleteTag extends z.infer<typeof TagModal> {
  posts: CompletePost[]
}

/**
 * RelatedTagModal contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTagModal: z.ZodSchema<CompleteTag> = z.lazy(() => TagModal.extend({
  posts: RelatedPostModal.array(),
}))
