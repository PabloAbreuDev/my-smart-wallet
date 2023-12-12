import { z } from 'zod'

export const updateCategoryRequestSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name needs to be a string',
      required_error: 'Name is required'
    })
    .min(1)
})
