import {Router} from 'express'
import {registerController,loginController,googleAuthController} from '../controllers/auth.controller.js'
import {validateRegisterUser,validateLoginUser} from '../validator/auth.validator.js'
import passport from 'passport'
const router = Router()


router.post("/register",validateRegisterUser,registerController)


router.post("/login",validateLoginUser,loginController)

//google oauth routes
router.get("/google",passport.authenticate("google",{scope:["profile","email"]}))

// This route will be called by Google after successful authentication
router.get("/google/callback",passport.authenticate("google",{session:false}),googleAuthController)

export default router