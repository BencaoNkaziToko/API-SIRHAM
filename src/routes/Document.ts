 import { Router } from 'express'
 import { getAll, getDocumentByID,Update, Create, Delete } from '../controllers/Document'


const router = Router()

router.post('/', Create)
router.get('/', getAll)
router.get('/:id', getDocumentByID)
router.put('/', Update)
router.delete('/', Delete)


 export default router


