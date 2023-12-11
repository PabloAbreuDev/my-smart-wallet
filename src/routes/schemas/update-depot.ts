import { z } from 'zod'

export const updateDepotRequestSchema = z.object({
  name: z.string({
    invalid_type_error: 'Name need to be an string',
    required_error: 'Name is required'
  }),
  description: z.string({
    invalid_type_error: 'Description need to be an string',
    required_error: 'Description is reuqired'
  })
})
