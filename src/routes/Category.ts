import { Router } from 'express'
import {getAll, Create, Update, Delete} from '../controllers/Category'

const router = Router()

router.get('/', getAll)
router.post('/', Create)
router.delete('/', Delete)
router.put('/', Update)


export default router