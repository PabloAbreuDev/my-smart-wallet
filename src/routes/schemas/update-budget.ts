import { z } from 'zod'

export const updateBudgetRequestSchema = z.object({
  amount: z.number({
    invalid_type_error: 'Amount needs to be a number',
    required_error: 'Amount is required'
  }),
  period: z.enum(['weekly', 'monthly', 'quarterly', 'semiannual', 'annual'], {
    invalid_type_error: 'Invalid period',
    required_error: 'Period is required'
  }),
  startDate: z.coerce.date({
    invalid_type_error: 'Start date needs to be a date',
    required_error: 'Start date is required'
  })
})
