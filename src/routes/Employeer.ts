import { Router } from 'express'
import {getAll, getEmployeerByID, Create, Update, Delete} from '../controllers/Employeer'

const router = Router()

router.get('/', getAll)
router.get('/:id', getEmployeerByID)
router.post('/', Create)
router.delete('/', Delete)
router.put('/', Update)


export default router