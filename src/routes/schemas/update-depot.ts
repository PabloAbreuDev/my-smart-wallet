import { z } from 'zod'

export const updateDepotRequestSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name need to be an string',
      required_error: 'Name is required'
    })
    .min(1),
  description: z
    .string({
      invalid_type_error: 'Description need to be an string',
      required_error: 'Description is reuqired'
    })
    .min(1)
})
