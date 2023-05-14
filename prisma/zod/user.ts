import * as z from "zod"

export const UserModal = z.object({
  id: z.number().int(),
  name: z.string(),
  passwordHash: z.string(),
})
