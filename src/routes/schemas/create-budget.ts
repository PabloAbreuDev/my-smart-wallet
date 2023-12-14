import { z } from 'zod'

export const createBudgetRequestSchema = z.object({
  category_id: z.string({
    invalid_type_error: 'Category ID needs to be a string',
    required_error: 'Category ID is required'
  }),
  amount: z.number({
    invalid_type_error: 'Amount needs to be a number',
    required_error: 'Amount is required'
  }),
  period: z.enum(['weekly', 'monthly', 'quarterly', 'semiannual', 'annual'], {
    required_error: 'Period is required',
    invalid_type_error: 'Invalid period'
  }),
  startDate: z.coerce.date({
    invalid_type_error: 'Start date needs to be a date',
    required_error: 'Start date is required'
  })
})
