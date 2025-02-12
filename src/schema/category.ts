import { z } from 'zod'

export const CategorySchema = z.object({
    name: z.string().min(2, 'O nome é obrigatório'),
    netSalary: z.number().nonnegative('O salário líquido é obrigatório'),
    grossSalary: z.number().nonnegative('O salário bruto é obrigatório')
});


