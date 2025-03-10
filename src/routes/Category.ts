import { Router } from 'express'
import {getAll, getCategoryByID, Create, Update, Delete} from '../controllers/Category'

const router = Router()

router.get('/', getAll)
router.get('/:id', getCategoryByID)
router.post('/', Create)
router.delete('/', Delete)
router.put('/', Update)


export default router