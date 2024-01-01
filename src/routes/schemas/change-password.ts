import { z } from 'zod'

export const changePasswordRequestSchema = z.object({
  newPassword: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password is an string'
    })
    .refine(
      value => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/
        return passwordRegex.test(value)
      },
      {
        message:
          'Password must be at least 8 characters long and contain at least one letter and one number.'
      }
    ),
  code: z.string({
    required_error: 'Code is required',
    invalid_type_error: 'Code need to be an string'
  })
})
