import { Schema, ZodError, z } from 'zod'

export const createFinancialMovementRequestSchema = z
  .object({
    description: z
      .string({
        invalid_type_error: 'Description needs to be a string',
        required_error: 'Description is required'
      })
      .min(1),
    amount: z
      .number({
        invalid_type_error: 'Amount needs to be a number',
        required_error: 'Amount is required'
      })
      .min(1),
    type: z.enum(['income', 'expense', 'transfer'], {
      required_error: 'Type is required',
      invalid_type_error: 'The enum possible is income, expense or transfer'
    }),
    source: z.string({
      invalid_type_error: 'Source needs to be a string',
      required_error: 'Source is required'
    }),
    destination: z
      .string({
        invalid_type_error: 'Destination needs to be a string'
      })
      .optional()
  })
  .refine(
    data => {
      // Verificar se source e destination são diferentes
      return data.source !== data.destination
    },
    {
      message: 'Source and destination must be different'
    }
  )
  .refine(
    data => {
      // Se destination estiver definido, o tipo deve ser "transfer"
      if (data.destination) {
        return data.type === 'transfer'
      }
      return true
    },
    {
      message: 'If destination is set, the type must be "transfer"'
    }
  )
  .refine(
    data => {
      // Se o tipo for "transfer", destination não pode estar vazio
      if (data.type === 'transfer') {
        return !!data.destination
      }
      return true
    },
    {
      message: 'If type is "transfer", destination cannot be empty'
    }
  )
