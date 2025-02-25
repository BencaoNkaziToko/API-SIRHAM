import { Router } from 'express'
import {getAll, getDismissalByID, Create, Update, Delete} from '../controllers/Dismissal'

const router = Router()

router.get('/', getAll)
router.get('/:id', getDismissalByID)
router.post('/', Create)
router.delete('/', Delete)
router.put('/', Update)


export default router