import { z } from 'zod'

export const createUserWithEmailRequestSchema = z.object({
  firstName: z
    .string({
      invalid_type_error: 'First name need to be an string',
      required_error: 'First name is required'
    })
    .min(1),
  lastName: z.string({ required_error: 'Last name is required' }).min(1),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email is an string'
    })
    .email({ message: 'Invalid email' }),
  password: z
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
    )
})
