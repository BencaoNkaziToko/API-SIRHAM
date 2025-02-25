import { z } from 'zod'

export const WorkDepartmentSchema = z.object({
    name: z.string().min(2, 'O nome é obrigatório'),
    competencies: z.string().min(2, 'É obrigatório definir as competências'),
    organicStatute: z.string().min(2, 'É obrigatório definir os Decretos sobre competências do Departamento')
}) 