import {z} from 'zod'

export const EmployeerSchema = z.object({
    agentNumber: z.string().min(2, 'O número de agente é obrigatório'),
    name: z.string().min(2, 'O nome é obrigatório'),
    gender: z.string().min(2, 'O Gênero é obrigatório'),
    phone: z.string().min(9, 'O número de telefone é obrigatório'),
    categoryId: z.string().min(2, 'A categoria do agente é obrigatória'),
    workDepartmentId: z.string().min(2, 'A direção ou gabinete do agente é obrigatório'),
    dateOfBirth: z.date(),
    dateOfAppointment: z.date()
});