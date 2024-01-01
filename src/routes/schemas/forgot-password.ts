import { z } from 'zod'

export const forgotPasswordRequestSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email is an string'
    })
    .email({ message: 'Invalid email' })
    .toLowerCase()
})
