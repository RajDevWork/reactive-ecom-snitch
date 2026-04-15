import {Router} from 'express'
import {registerController,loginController} from '../controllers/auth.controller.js'
import {validateRegisterUser} from '../validator/auth.validator.js'

const router = Router()


router.post("/register",validateRegisterUser,registerController)





export default router