import {Router} from 'express'
import {registerController,loginController} from '../controllers/auth.controller.js'
import {validateRegisterUser,validateLoginUser} from '../validator/auth.validator.js'

const router = Router()


router.post("/register",validateRegisterUser,registerController)


router.post("/login",validateLoginUser,loginController)


export default router