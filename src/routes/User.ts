import { Router } from "express"
import { getAll /*, Create, Delete, Update*/ } from "../controllers/User"

const router = Router()

router.get('/', getAll)
/*
router.post('/', Create)

router.put('/', Update)

router.delete('/', Delete)
*/
export default router
