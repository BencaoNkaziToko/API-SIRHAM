import {z} from 'zod'

export const DocumentSchema = z.object({
    title: z.string().min(2, 'O título do documento é obrigatório'),
    dateOfIssuance: z.date(),
    path: z.string().min(9, 'O link do documento é obrigatório'),
    workDepartmentId: z.string().min(2, 'A direção ou gabinete do agente é obrigatório'),
    dateOfAppointment: z.date(),
    employeeId: z.string().min(2, 'É obrigatório vincular o documento a um Agente')
});
