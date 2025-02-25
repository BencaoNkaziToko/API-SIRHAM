import  { Router } from 'express'
import { getAll, Create, Update, Delete, getWorkDepartmentByID  } from '../controllers/WorkDepartment'

const router = Router()

router.get('/', getAll)
router.post('/', Create)
router.put('/', Update)
router.delete('/', Delete)
router.get('/:id', getWorkDepartmentByID)


export default router